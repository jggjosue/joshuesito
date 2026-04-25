import {defineField, defineType} from "sanity";

export const jobType = defineType({
    name: 'job',
    title: 'Job',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'array',
            title: 'Description',
            of: [
                {
                    type: 'block',
                },
            ],
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'url',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{type: 'string'}],
        }),
    ],
})