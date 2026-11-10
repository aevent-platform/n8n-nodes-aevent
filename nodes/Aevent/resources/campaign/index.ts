import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCampaigns = {
    resource: ['campaign'],
};

export const campaignDescription: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForCampaigns,
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                action: 'Get a campaign',
                description: 'Get details of a single campaign',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/webinartimelineevent/get',
                        body: {
                            webinarTimeline: '={{ $parameter.campaignId }}',
                        },
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get many campaigns',
                description: 'Retrieve a list of campaigns',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/webinartimelinemaster/get',
                    },
                },
            },
        ],
        default: 'getAll',
    },

    // ----------------------------------
    //        campaign: getAll
    // ----------------------------------
    {
        displayName: 'User ID',
        name: 'userId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['campaign'],
                operation: ['getAll'],
            },
        },
        description: 'The User ID required by AEvent to list campaigns',
    },

    // ----------------------------------
    //        campaign: get
    // ----------------------------------
    {
        displayName: 'Campaign ID',
        name: 'campaignId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['campaign'],
                operation: ['get'],
            },
        },
        description: 'The unique identifier (webinarTimeline) of the campaign',
    },
];