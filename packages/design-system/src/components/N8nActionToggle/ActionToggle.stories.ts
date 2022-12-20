import N8nActionToggle from './ActionToggle.vue';
import { action } from '@storybook/addon-actions';
import type { StoryFn } from '@storybook/vue3';

export default {
	title: 'Atoms/ActionToggle',
	component: N8nActionToggle,
	argTypes: {
		placement: {
			type: 'select',
			options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-end'],
		},
		size: {
			type: 'select',
			options: ['mini', 'small', 'medium'],
		},
	},
	parameters: {
		backgrounds: { default: '--color-background-light' },
	},
};

const methods = {
	onAction: action('action'),
};

const Template: StoryFn = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		N8nActionToggle,
	},
	template:
		'<div style="height:300px;width:300px;display:flex;align-items:center;justify-content:center"><n8n-action-toggle v-bind="$attrs" @action="onAction" /></div>',
	methods,
});

export const ActionToggle = Template.bind({});
ActionToggle.args = {
	actions: [
		{
			label: 'Go',
			value: 'go',
		},
		{
			label: 'Stop',
			value: 'stop',
		},
	],
};
