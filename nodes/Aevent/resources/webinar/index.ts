import type { INodeProperties } from 'n8n-workflow';

const showOnlyForWebinars = {
    resource: ['webinar'],
};

export const webinarDescription: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForWebinars,
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                action: 'Get a webinar',
                description: 'Get details of a single webinar',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/webinars/{{$parameter.webinarId}}',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get many webinars', // FIX: Must start with "Get many"
                description: 'Retrieve a list of webinars',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/webinars',
                    },
                },
            },
        ],
        default: 'getAll',
    },

    // ----------------------------------
    //         webinar: get
    // ----------------------------------
    {
        displayName: 'Webinar ID',
        name: 'webinarId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['webinar'],
                operation: ['get'],
            },
        },
        description: 'The unique identifier of the webinar',
    },
];