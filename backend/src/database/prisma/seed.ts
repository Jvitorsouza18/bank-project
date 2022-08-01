import { transactionSample } from './transactions/index';
import { PrismaClient } from '@prisma/client';
import { users } from './users';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  for (const user of users) {
    const addUser = { ...user, id: uuidv4() };
    await prisma.user.create({
      data: addUser,
    });
  }

  const user = await prisma.user.findFirst({
    where: { email: 'adranzim@email.com' },
  });

  await prisma.transaction.create({
    data: { ...transactionSample, senderId: user.id },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
