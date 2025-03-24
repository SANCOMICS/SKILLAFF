import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      id: 'user-1',
      email: 'user@test.com',
      password: 'password123',
      globalRole: 'USER',
      status: 'VERIFIED',
    },
  })

  await prisma.user.create({
    data: {
      id: 'admin-1',
      email: 'admin@test.com',
      password: 'password123',
      globalRole: 'ADMIN',
      status: 'VERIFIED',
    },
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
