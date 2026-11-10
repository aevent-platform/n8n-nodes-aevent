import type { INodeProperties } from 'n8n-workflow';

const showOnlyForRegistrations = {
    resource: ['registration'],
};

export const registrationDescription: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForRegistrations,
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Register a person',
                description: 'Register a user for an AEvent webinar or campaign',
                routing: {
                    request: {
                        method: 'POST',
                        url: 'https://devacct.aevent.online/api-registration',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: {
                            secret: '={{ $parameter.secret }}',
                            email: '={{ $parameter.email }}',
                            first_name: '={{ $parameter.firstName }}',
                            last_name: '={{ $parameter.lastName }}',
                            webinarTimeline: '={{ $parameter.webinarTimeline }}',
                        },
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get many registrants',
                description: 'Retrieve a list of registrants',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/registrants',
                    },
                },
            },
        ],
        default: 'create',
    },

    // ----------------------------------
    //        registration: create
    // ----------------------------------
    {
        displayName: 'Secret',
        name: 'secret',
        type: 'string',
        typeOptions: {
            password: true,
        },
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['registration'],
                operation: ['create'],
            },
        },
        description: 'The secret key required for API registration authorization',
    },
    {
        displayName: 'Webinar Timeline (Campaign ID)',
        name: 'webinarTimeline',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['registration'],
                operation: ['create'],
            },
        },
        description: 'The webinar timeline identifier for the registration',
    },
    {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['registration'],
                operation: ['create'],
            },
        },
        description: 'Email address of the registrant',
    },
    {
        displayName: 'First Name',
        name: 'firstName',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['registration'],
                operation: ['create'],
            },
        },
    },
    {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['registration'],
                operation: ['create'],
            },
        },
    },
];