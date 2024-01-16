import type { MigrationContext, ReversibleMigration } from '@db/types';

export class DropGlobalRoleMapping1705429061930 implements ReversibleMigration {
	async up({
		escape,
		runQuery,
		schemaBuilder: { addColumns, dropColumns, addNotNull, column },
	}: MigrationContext) {
		await addColumns('user', [column('role').text]);

		const roleTable = escape.tableName('role');
		const userTable = escape.tableName('user');
		await runQuery(
			`UPDATE ${userTable} SET role = r.name
				FROM ${userTable} u
				LEFT JOIN ${roleTable} r
				ON u.${escape.columnName('globalRoleId')} = r.id and r.scope = :scope
				WHERE ${userTable}.id = u.id`,
			{ scope: 'global' },
		);

		await dropColumns('user', ['globalRoleId']);
		await addNotNull('user', 'role');
	}

	async down() {
		// TODO: implement this
	}
}
