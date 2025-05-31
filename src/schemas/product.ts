export const productSchema = {
    body: {
        type: 'object',
        required: ['name', 'description', 'price', 'category', 'pictureUrl'],
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            category: { type: 'string' },
            pictureUrl: { type: 'string' }
        },
        additionalProperties: false
    }
};