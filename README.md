# n8n-nodes-aevent

This is an n8n community node that lets you use [AEvent](https://aevent.com) in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation) · [Operations](#operations) · [Credentials](#credentials) · [Usage](#usage) · [Development](#development) · [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. In your n8n instance, go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-aevent` in the **npm Package Name** field.
4. Agree to the risks and select **Install**.

## Operations

### AEvent node

| Resource     | Operations       |
|--------------|------------------|
| Registration | Create, Get Many |
| Webinar      | Get, Get Many    |
| Campaign     | Get, Get Many    |

### AEvent Trigger node

| Event                     | Fires when                                     |
|---------------------------|------------------------------------------------|
| Registrant Created        | A new registrant is added                      |
| Timeline Action Triggered | A webinar timeline action fires                |
| Webinar Attended          | A webinar ends, with its attendance report     |

## Credentials

1. In AEvent, open **Settings > Developer** and copy your API key.
2. In n8n, create a new **AEvent API** credential.
3. Paste the key into **API Key**.
4. Leave **Base URL** as `https://app-api.aevent.com`.

n8n checks the key when you save the credential.

## Usage

The AEvent Trigger registers a webhook with AEvent when you activate the workflow. AEvent must be able to reach your n8n instance, so self-hosted instances need a public URL set in `WEBHOOK_URL`.

## Development

```bash
git clone https://github.com/automa8/n8n-nodes-aevent.git
cd n8n-nodes-aevent
npm install
npm run build
npm run lint
```

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [AEvent](https://aevent.com)
