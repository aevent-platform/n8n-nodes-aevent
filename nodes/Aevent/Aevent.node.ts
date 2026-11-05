import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { webinarDescription } from './resources/webinar';
import { campaignDescription } from './resources/campaign';
import { registrationDescription } from './resources/registrant';

export class Aevent implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'AEvent',
        name: 'aevent',
        icon: 'file:aevent_logo_new.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with the AEvent API',
        defaults: {
            name: 'AEvent',
        },
        usableAsTool: true,
        inputs: [NodeConnectionTypes.Main],
        outputs: [NodeConnectionTypes.Main],
        credentials: [{ name: 'aeventApi', required: true }],
        requestDefaults: {
            baseURL: '={{$credentials.baseUrl}}/api',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    { name: 'Registration', value: 'registration' },
                    { name: 'Webinar', value: 'webinar' },
                    { name: 'Campaign', value: 'campaign' },
                ],
                default: 'registration',
            },
            ...registrationDescription,
            ...webinarDescription,
            ...campaignDescription,
        ],
    };
}