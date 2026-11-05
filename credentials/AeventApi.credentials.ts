// credentials/AeventApi.credentials.ts
import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AeventApi implements ICredentialType {
	name = 'aeventApi';
	displayName = 'AEvent API';
	documentationUrl = 'https://app.aevent.com/#/settings?developer';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app-api.aevent.com',
			description: 'Use https://dev-api.aevent.com for staging',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{ "Bearer " + $credentials.apiKey }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/n8n/connect',
			method: 'POST',
		},
	};
}
