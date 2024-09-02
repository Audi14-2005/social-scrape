import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import fs from 'fs';
import imageSize from 'image-size';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Helper function to convert an image file to base64
const getBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'base64' }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const fileExtension = filePath.split('.').pop().toLowerCase();
                const base64Prefix = fileExtension === 'png' ? 'data:image/png;base64,' :
                    fileExtension === 'jpg' || fileExtension === 'jpeg' ? 'data:image/jpeg;base64,' :
                        null;

                if (base64Prefix) {
                    resolve(`${base64Prefix}${data}`);
                } else {
                    reject(new Error('Unsupported image format'));
                }
            }
        });
    });
};

// Adjust image size based on available width and scaling rules
const adjustImageSize = async (imageBase64, availableWidth) => {
    const imageBuffer = Buffer.from(imageBase64.split(',')[1], 'base64');
    const dimensions = await imageSize(imageBuffer);
    const maxWidth = availableWidth;
    const minScale = 0.45;
    const maxScale = Math.min(maxWidth / dimensions.width, 1);
    let scale = Math.min(maxScale, minScale);
    let width = dimensions.width * scale;
    let height = dimensions.height * (width / dimensions.width);

    // Ensure the scaled image fits within the available space
    if (width > maxWidth) {
        width = maxWidth;
        height = dimensions.height * (width / dimensions.width);
    }

    return { width, height };
};

// Calculate available width for images
const getAvailableWidth = () => {
    const pageWidth = 595.28; // A4 width in points
    const margin = 40; // left and right margins
    return pageWidth - 2 * margin;
};

// Recursive function to generate content from JSON data
const generateContentFromJson = (jsonData, level = 0) => {
    const content = [];
    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            if (typeof jsonData[key] === 'object') {
                if (Array.isArray(jsonData[key])) {
                    content.push({ text: `${key}:`, style: `subheader${level}` });
                    jsonData[key].forEach((item, index) => {
                        if (typeof item === 'object') {
                            content.push({ text: `${key} ${index + 1}`, style: `subheader${level + 1}` });
                            content.push(...generateContentFromJson(item, level + 1));
                        } else {
                            content.push({
                                text: `${key} ${index + 1}: ${item}`,
                                margin: [level * 10, 0, 0, 0],
                                style: `body${level}`
                            });
                        }
                    });
                } else {
                    content.push({ text: `${key}:`, style: `header${level}` });
                    content.push(...generateContentFromJson(jsonData[key], level + 1));
                }
            } else {
                content.push({
                    text: `${key}: ${jsonData[key]}`,
                    margin: [level * 10, 0, 0, 0],
                    style: `body${level}`
                });
            }
        }
    }
    return content;
};

// Main function to generate the PDF
const generatePdf = async () => {
    try {
        // Define the paths for the JSON data and images
        const jsonFilePath = '"E:\SocialScrape\social-scrape\src\assets\example_2.json"' // Replace with actual JSON file path
        const imageFilePaths = [
            'F:\\Dummy Project\\dummy-app\\src\\assets\\IMG_5196.jpg',
            'F:\\Dummy Project\\dummy-app\\src\\assets\\IMG_4589.jpg'
        ];

        // Load JSON data
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

        // Convert images to base64 strings and adjust their size
        const availableWidth = getAvailableWidth();
        const base64Images = await Promise.all(imageFilePaths.map(async filePath => {
            const base64Image = await getBase64(filePath);
            const { width, height } = await adjustImageSize(base64Image, (availableWidth / 2 - 10)); // 10 points for margins
            return { base64Image, width, height };
        }));

        // Generate content from JSON data
        const content = generateContentFromJson(jsonData);

        // Add images at the end
        content.push({ text: 'Images:', style: 'header0', margin: [0, 20, 0, 10] });
        content.push({
            columns: base64Images.map(({ base64Image, width, height }) => ({
                image: base64Image,
                width: width,
                height: height,
                margin: [5, 10, 5, 5]
            })),
            columnGap: 10
        });

        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [40, 60, 40, 60],
            content: content,
            background: [
                {
                    canvas: [
                        { type: 'rect', x: 0, y: 0, w: 595.28, h: 841.89, color: '#F1F1F1' } // Light gray background
                    ]
                }
            ],
            styles: {
                header0: {
                    fontSize: 20,
                    bold: true,
                    color: '#003366', // Deep Blue
                    margin: [0, 20, 0, 10],
                    alignment: 'left'
                },
                header1: {
                    fontSize: 18,
                    bold: true,
                    color: '#004080', // Royal Blue
                    margin: [0, 15, 0, 5],
                    alignment: 'left'
                },
                header2: {
                    fontSize: 16,
                    bold: true,
                    color: '#0066cc', // Sky Blue
                    margin: [0, 10, 0, 5],
                    alignment: 'left'
                },
                header3: {
                    fontSize: 14,
                    bold: true,
                    color: '#3399ff', // Light Blue
                    margin: [0, 5, 0, 5],
                    alignment: 'left'
                },
                subheader0: {
                    fontSize: 16,
                    bold: false,
                    color: '#005555', // Teal Green
                    margin: [10, 10, 0, 5],
                    alignment: 'left'
                },
                subheader1: {
                    fontSize: 14,
                    bold: false,
                    color: '#008080', // Ocean Green
                    margin: [20, 10, 0, 5],
                    alignment: 'left'
                },
                subheader2: {
                    fontSize: 12,
                    bold: false,
                    color: '#00cccc', // Aqua
                    margin: [30, 10, 0, 5],
                    alignment: 'left'
                },
                body0: {
                    fontSize: 14,
                    color: '#333333', // Charcoal
                    margin: [10, 0, 0, 5],
                    alignment: 'left'
                },
                body1: {
                    fontSize: 12,
                    color: '#666666', // Gray
                    margin: [20, 0, 0, 5],
                    alignment: 'left'
                },
                body2: {
                    fontSize: 10,
                    color: '#999999', // Light Gray
                    margin: [30, 0, 0, 5],
                    alignment: 'left'
                },
                footer: {
                    fontSize: 10,
                    italics: true,
                    alignment: 'center',
                    color: '#003366' // Deep Blue
                }
            },
            footer: function (currentPage, pageCount) {
                return {
                    text: `Copyright, SocialScrape 2024`,
                    style: 'footer'
                };
            }
        };

        // Helper function to get the next report number
        const getNextReportNumber = () => {
            const reportFiles = fs.readdirSync('F:\\Dummy Project\\Generated Reports');
            const reportNumbers = reportFiles
                .filter(file => file.startsWith('Report_') && file.endsWith('.pdf'))
                .map(file => parseInt(file.split('_')[1].split('.')[0], 10))
                .sort((a, b) => b - a);

            return (reportNumbers[0] || 0) + 1;
        };

        // Generate and save the PDF
        const reportNumber = getNextReportNumber(); // Retrieve the next report number
        const pdfPath = `F:\\Dummy Project\\Generated Reports\\Report_${reportNumber}.pdf`;

        pdfMake.createPdf(docDefinition).getBuffer((buffer) => {
            const pdfBuffer = Buffer.from(buffer);
            fs.writeFileSync(pdfPath, pdfBuffer);
            console.log(`PDF generated successfully: ${pdfPath}`);
        });

    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

// Run the PDF
generatePdf();
