import {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	NodeConnectionTypes,
} from 'n8n-workflow';

export class AeventTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AEvent Trigger',
		name: 'aeventTrigger',
		icon: 'file:aevent_logo_new.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Triggers a workflow when events occur in AEvent',
		defaults: {
			name: 'AEvent Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'aeventApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'setup',
				httpMethod: 'GET',
				responseMode: 'onReceived',
				path: 'webhook',
			},
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Registrant Created',
						value: 'registrant.created',
						description: 'Triggers when a new registrant is added',
					},
					{
						name: 'Timeline Action Triggered',
						value: 'timeline.action',
						description: 'Triggers when a timeline action fires',
					},
					{
						name: 'Webinar Attended',
						value: 'webinar.attended',
						description: 'Triggers with the attendance report once a webinar has ended',
					},
				],
				default: 'registrant.created',
				required: true,
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;

				// Create a unique label for this n8n hook instance
				const hookLabel = `n8n_${this.getNode().id}_${Date.now()}`;

				const workflow = this.getWorkflow();
				const { baseUrl } = await this.getCredentials('aeventApi');

				const body = {
					label: hookLabel,
					hookUrl: webhookUrl,
					event: event,
					workflow_id: workflow.id,
					workflow_name: workflow.name,
				};

				// Registers webhook via recieveWebhookData() on N8nController
				await this.helpers.httpRequestWithAuthentication.call(this, 'aeventApi', {
					method: 'POST',
					url: `${baseUrl}/api/n8n/consume`,
					body,
					json: true,
				});

				// Store label in static data so delete() can clean it up
				const staticData = this.getWorkflowStaticData('node');
				staticData.hookLabel = hookLabel;

				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const staticData = this.getWorkflowStaticData('node');
				const hookLabel = staticData.hookLabel as string;

				if (hookLabel) {
					const { baseUrl } = await this.getCredentials('aeventApi');
					try {
						// Calls detachHook() on N8nController
						await this.helpers.httpRequestWithAuthentication.call(this, 'aeventApi', {
							method: 'DELETE',
							url: `${baseUrl}/api/n8n/hooks/${encodeURIComponent(hookLabel)}`,
							json: true,
						});
					} catch (error) {
						return Promise.reject(error);
					}
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		if (this.getWebhookName() === 'setup') {
			return { webhookResponse: { ok: true } };
		}
		const req = this.getRequestObject();
		return {
			workflowData: [this.helpers.returnJsonArray(req.body)],
		};
	}
}