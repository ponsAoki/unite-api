// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

if (process.env.RUN_DEPLOY_MIGRATIONS === 'true') {
  execSync('npx prisma migrate deploy && npx prisma generate', {
    stdio: 'inherit',
  });
}
