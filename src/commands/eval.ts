import { ApplyOptions } from '@sapphire/decorators';
import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { inspect } from 'util';

@ApplyOptions<Command.Options>({
	description: 'Evals any JavaScript code',
	preconditions: ['OwnerOnly']
})
export class EvalCommand extends Command {
	public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		let code = interaction.options.getString('code', true);
		const async = interaction.options.getBoolean('async') ?? false;
		const depth = interaction.options.getNumber('depth') ?? 0;
		const showHidden = interaction.options.getBoolean('showHidden') ?? false;
		const silent = interaction.options.getBoolean('silent') ?? false;

		if (async) code = `(async () => {\n${code}\n})();`;

		let success = true;
		let result = null;

		try {
			// eslint-disable-next-line no-eval
			result = eval(code);
		} catch (error) {
			if (error && error instanceof Error && error.stack) {
				this.container.client.logger.error(error);
			}
			result = error;
			success = false;
		}

		const type = new Type(result).toString();
		if (isThenable(result)) result = await result;

		if (typeof result !== 'string') {
			result = inspect(result, {
				depth,
				showHidden
			});
		}

		// return { result, success, type };

		const output = success ? codeBlock('js', result) : `**ERROR**: ${codeBlock('bash', result)}`;
		if (silent) return interaction.reply(`||result hidden||`);

		const typeFooter = `**Type**: ${codeBlock('typescript', type)}`;

		if (output.length > 2000) {
			return interaction.reply({
				content: `Output was too long... sent the result as a file.\n\n${typeFooter}`,
				files: [{ attachment: Buffer.from(output), name: 'output.js' }]
			});
		}

		return interaction.reply(`${output}\n${typeFooter}`);
	}

	public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
		registry.registerChatInputCommand(
			(b) =>
				b //
					.setName(this.name)
					.setDescription(this.description)
					.addStringOption((option) =>
						option //
							.setName('code')
							.setDescription('the code to evaluate')
							.setRequired(true)
					)
					.addBooleanOption((option) =>
						option //
							.setName('async')
							.setDescription('wether the code is asynchronous')
					)
					.addBooleanOption((option) =>
						option //
							.setName('silent')
							.setDescription('wether the result should be printed')
					)
					.addBooleanOption((option) =>
						option //
							.setName('showhidden')
							.setDescription('showHidden passed to util.inspect')
					)
					.addIntegerOption((option) =>
						option //
							.setName('depth')
							.setDescription('depth passed to util.inspect')
					),
			{ idHints: ['1121067309524594798'] }
		);
	}
}
