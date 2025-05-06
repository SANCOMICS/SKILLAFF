import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e29ddd8e-e0eb-412d-ba1d-9b2924f3f3c8', '1Lew.Hills-Baumbach@hotmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1f20fd4a-6167-47c9-a778-62f3cfde0ea9', '9Ulises_Strosin@hotmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=11', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('65bc50f2-040a-4646-a744-430ed3051fbb', '25Tyrell_Reilly@yahoo.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('5ffe22da-1a43-4454-b363-5bc9bc49b0da', '33Maudie.Ebert22@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('d83e46e8-8ad3-4640-9a4f-909ecaa52d6b', '41Odessa50@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('58da05b3-ae42-4d04-b864-b35723e29777', '49Joel_Rodriguez30@gmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('c69de2fb-3b64-4ff4-855f-c1b9671d8045', '57Drew84@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('4a43f688-b942-41a6-b564-94efe83e69ab', '65Deion_Gutkowski30@hotmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('ab94517f-5354-4b88-918d-77ad1791f728', '73Bulah_Donnelly-Wiegand11@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('86a6f616-e29d-4e55-bca5-0a89bebe3a2b', 'Premium', '2025-02-05T18:22:44.685Z', '2025-05-14T08:58:26.751Z', 'Cancelled', '58da05b3-ae42-4d04-b864-b35723e29777');
INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('3f1ff7ba-cf10-4069-b131-2a1d51810eb5', 'Enterprise', '2024-04-04T02:43:35.335Z', '2024-01-25T13:55:30.693Z', 'Pending', '4a43f688-b942-41a6-b564-94efe83e69ab');
INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('34ad3942-c5a8-4cfe-99e1-7da7f0e8d902', 'Enterprise', '2024-03-01T20:53:04.502Z', '2024-02-19T03:07:37.353Z', 'Cancelled', '5ffe22da-1a43-4454-b363-5bc9bc49b0da');
INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('d9361856-0cf0-49cf-a12c-ba3f12f79576', 'Basic', '2024-04-18T12:23:01.962Z', '2024-09-23T11:31:27.588Z', 'Pending', 'c69de2fb-3b64-4ff4-855f-c1b9671d8045');
INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('79417019-fcb6-4035-b1df-47e04e04e89d', 'Pro', '2024-10-15T06:43:37.365Z', '2024-09-29T23:38:58.340Z', 'Active', '4a43f688-b942-41a6-b564-94efe83e69ab');
INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('257e2d03-610f-4df4-9ee4-a8193979203c', 'Enterprise', '2025-08-08T19:16:45.889Z', '2025-02-23T09:47:08.946Z', 'Cancelled', '65bc50f2-040a-4646-a744-430ed3051fbb');
INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('6ae7646b-e9f2-470d-869c-673ffd422b9a', 'Basic', '2025-12-28T21:21:34.350Z', '2025-03-13T23:20:45.325Z', 'Pending', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('10976f89-0f16-48c5-9067-e034dc5fff5b', 'Student', '2025-09-05T12:23:21.874Z', '2024-12-12T21:46:45.027Z', 'Cancelled', '4a43f688-b942-41a6-b564-94efe83e69ab');
INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('afc7e70d-fa80-4029-a1c5-fe272cbf291d', 'Pro', '2024-05-10T19:18:36.583Z', '2025-10-02T15:57:16.371Z', 'Expired', 'ab94517f-5354-4b88-918d-77ad1791f728');
INSERT INTO "Subscription" ("id", "planType", "startDate", "endDate", "status", "userId") VALUES ('52b75af1-182c-4a5a-98ac-16bdf1641728', 'Premium', '2024-03-01T11:17:58.319Z', '2025-02-23T23:10:03.090Z', 'Expired', 'ab94517f-5354-4b88-918d-77ad1791f728');

INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('a39918ad-77a2-4223-94f6-2258e1127da3', 'Building a Personal Brand', 'Discover how to create and maintain a strong personal brand online.', 'https://i.imgur.com/YfJQV5z.png?id=133', 'https://i.imgur.com/YfJQV5z.png?id=134', false, '750xaf');
INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('f453b430-b6b8-4ab2-a7ef-fcb77c6c8bf8', 'Introduction to Graphic Design', 'A comprehensive guide to the fundamentals of graphic design.', 'https://i.imgur.com/YfJQV5z.png?id=140', 'https://i.imgur.com/YfJQV5z.png?id=141', true, '1500xaf');
INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('92e6ce4d-71e4-4a96-b575-e75609ec60f0', 'Ecommerce Essentials', 'Understand the key components of running a successful ecommerce business.', 'https://i.imgur.com/YfJQV5z.png?id=147', 'https://i.imgur.com/YfJQV5z.png?id=148', false, '2000xaf');
INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('809b0e17-d194-4583-b784-7ea46ea8fe8c', 'Ecommerce Essentials', 'Learn the latest strategies in digital marketing to boost your online presence.', 'https://i.imgur.com/YfJQV5z.png?id=154', 'https://i.imgur.com/YfJQV5z.png?id=155', true, '500xaf');
INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('f9259c9b-2c51-447e-bf52-651ec9e16e15', 'Advanced Python Programming', 'A comprehensive guide to the fundamentals of graphic design.', 'https://i.imgur.com/YfJQV5z.png?id=161', 'https://i.imgur.com/YfJQV5z.png?id=162', false, '1000xaf');
INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('a21d4529-c41d-4e54-9808-51bb1bdf6dc3', 'Mastering Digital Marketing', 'Discover how to create and maintain a strong personal brand online.', 'https://i.imgur.com/YfJQV5z.png?id=168', 'https://i.imgur.com/YfJQV5z.png?id=169', false, '1000xaf');
INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('9e12d8bf-3ad3-4b5e-9b20-2e71f187405a', 'Ecommerce Essentials', 'Discover how to create and maintain a strong personal brand online.', 'https://i.imgur.com/YfJQV5z.png?id=175', 'https://i.imgur.com/YfJQV5z.png?id=176', false, '2000xaf');
INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('9469ff0f-96cf-40ef-83d2-5ddd0cb50462', 'Building a Personal Brand', 'Understand the key components of running a successful ecommerce business.', 'https://i.imgur.com/YfJQV5z.png?id=182', 'https://i.imgur.com/YfJQV5z.png?id=183', true, '1000xaf');
INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('720908ba-178f-49b0-802c-0ca5c6e26e4f', 'Ecommerce Essentials', 'Learn the latest strategies in digital marketing to boost your online presence.', 'https://i.imgur.com/YfJQV5z.png?id=189', 'https://i.imgur.com/YfJQV5z.png?id=190', false, '750xaf');
INSERT INTO "Course" ("id", "title", "description", "previewUrl", "contentUrl", "isPremium", "price") VALUES ('63ab2122-d741-4f53-92e8-53d88d82aa46', 'Introduction to Graphic Design', 'Learn the latest strategies in digital marketing to boost your online presence.', 'https://i.imgur.com/YfJQV5z.png?id=196', 'https://i.imgur.com/YfJQV5z.png?id=197', true, '2000xaf');

INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('f19894a0-5ace-49ea-83dc-4d2a83dcc10d', '0', '0', 'c69de2fb-3b64-4ff4-855f-c1b9671d8045');
INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('d639f594-5bef-42c9-8438-2b729284d073', '0', '0', 'e29ddd8e-e0eb-412d-ba1d-9b2924f3f3c8');
INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('0bc7734c-fe61-4a17-88dd-5ca93020de4e', '0', '0', 'd83e46e8-8ad3-4640-9a4f-909ecaa52d6b');
INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('9adf2419-a5a1-4e5f-a9ed-0a8ac796fa9f', '0', '0', 'ab94517f-5354-4b88-918d-77ad1791f728');
INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('15a15498-02b4-4447-b0a5-e3a74d821fdd', '0', '0', '4a43f688-b942-41a6-b564-94efe83e69ab');
INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('dce9e455-bbd7-45e6-80d5-35d9b9194c69', '0', '0', 'ab94517f-5354-4b88-918d-77ad1791f728');
INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('a30d9b92-fd15-4e9c-95e6-d54c5abebdb5', '0', '0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('e90cef41-a126-4ae7-8abb-11da0f6b5f63', '0', '0', 'ab94517f-5354-4b88-918d-77ad1791f728');
INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('1d7d771e-5582-4d07-8edd-e6d9d6f13730', '0', '0', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Wallet" ("id", "balance", "totalEarnings", "userId") VALUES ('6972f00e-463a-40a6-a956-fabe52756912', '0', '0', 'c69de2fb-3b64-4ff4-855f-c1b9671d8045');

INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('73c528ac-a5e6-4a6f-9501-94bdb7f5ae6a', '500xaf', 'completed', 'ab94517f-5354-4b88-918d-77ad1791f728', '5ffe22da-1a43-4454-b363-5bc9bc49b0da');
INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('d172a28e-9ffd-4058-b4f7-3d7672055cfe', '500xaf', 'failed', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'e29ddd8e-e0eb-412d-ba1d-9b2924f3f3c8');
INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('2628f942-cc8b-461e-b154-fd9f8f5fa439', '750xaf', 'completed', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '65bc50f2-040a-4646-a744-430ed3051fbb');
INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('28b7b2c0-fab4-4800-afd3-cd9b98232116', '600xaf', 'completed', '5ffe22da-1a43-4454-b363-5bc9bc49b0da', 'ab94517f-5354-4b88-918d-77ad1791f728');
INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('28386aa1-5df2-419e-be96-16ff5b4f1fd4', '750xaf', 'pending', '4a43f688-b942-41a6-b564-94efe83e69ab', 'e29ddd8e-e0eb-412d-ba1d-9b2924f3f3c8');
INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('18d3440e-b414-438d-9110-dedcbb5aa798', '1000xaf', 'failed', '5ffe22da-1a43-4454-b363-5bc9bc49b0da', '58da05b3-ae42-4d04-b864-b35723e29777');
INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('a40c578c-e109-4424-aaf3-ae33e1cb9f8f', '1000xaf', 'pending', 'c69de2fb-3b64-4ff4-855f-c1b9671d8045', 'd83e46e8-8ad3-4640-9a4f-909ecaa52d6b');
INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('373b5f8c-a638-4dfc-bc5a-5ba1299510e1', '1000xaf', 'completed', '5ffe22da-1a43-4454-b363-5bc9bc49b0da', '5ffe22da-1a43-4454-b363-5bc9bc49b0da');
INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('5e62623f-8379-4b92-b47c-995f6eb28e1a', '750xaf', 'pending', 'ab94517f-5354-4b88-918d-77ad1791f728', 'ab94517f-5354-4b88-918d-77ad1791f728');
INSERT INTO "Referral" ("id", "commission", "status", "referrerId", "referredId") VALUES ('df437e2e-a98a-4ea8-b4e0-8a49254f8d59', '1000xaf', 'pending', 'c69de2fb-3b64-4ff4-855f-c1b9671d8045', '1f20fd4a-6167-47c9-a778-62f3cfde0ea9');

INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('c67f2538-ea3d-4a20-9a3d-da1d98525dac', '3000xaf', 'upgrade', 'inprogress', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '28386aa1-5df2-419e-be96-16ff5b4f1fd4');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('cf287d31-3012-4b80-acd8-961126571acf', '3000xaf', 'deposit', 'completed', '65bc50f2-040a-4646-a744-430ed3051fbb', 'a40c578c-e109-4424-aaf3-ae33e1cb9f8f');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('c8e8419c-cb03-4734-8a8b-8494105e969a', '1500xaf', 'commission', 'cancelled', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '28386aa1-5df2-419e-be96-16ff5b4f1fd4');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('5528788b-f25a-4198-8558-18f0a6f6b9eb', '3000xaf', 'upgrade', 'cancelled', 'ab94517f-5354-4b88-918d-77ad1791f728', '73c528ac-a5e6-4a6f-9501-94bdb7f5ae6a');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('2d33ae07-41c6-4cee-abbd-4eb06bf857f2', '2500xaf', 'refund', 'inprogress', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '2628f942-cc8b-461e-b154-fd9f8f5fa439');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('62dce306-ed38-4efa-9e1e-7ae730ddb08f', '1500xaf', 'withdrawal', 'pending', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '18d3440e-b414-438d-9110-dedcbb5aa798');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('da5d4e92-bc45-41f9-aff1-1791b53b1fee', '2500xaf', 'withdrawal', 'failed', '4a43f688-b942-41a6-b564-94efe83e69ab', '2628f942-cc8b-461e-b154-fd9f8f5fa439');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('c423d59d-2e40-4cb7-b875-12b18c1baadb', '1500xaf', 'withdrawal', 'cancelled', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '373b5f8c-a638-4dfc-bc5a-5ba1299510e1');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('02b803f7-c41c-47ba-8aad-50c46c600f4f', '2500xaf', 'withdrawal', 'inprogress', 'd83e46e8-8ad3-4640-9a4f-909ecaa52d6b', '5e62623f-8379-4b92-b47c-995f6eb28e1a');
INSERT INTO "Transaction" ("id", "amount", "type", "status", "userId", "referralId") VALUES ('5ef6a109-b0a2-4609-9a70-31e2bb48e086', '1500xaf', 'withdrawal', 'completed', 'c69de2fb-3b64-4ff4-855f-c1b9671d8045', '5e62623f-8379-4b92-b47c-995f6eb28e1a');

INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('b12b43bb-ea98-4e4c-8045-f2696c7c15c6', 'Facebook', '123456789', 'suspended', '65bc50f2-040a-4646-a744-430ed3051fbb');
INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('9e3adbf3-a57a-4d83-aa15-80e9612168f8', 'TikTok', '123456789', 'inactive', '58da05b3-ae42-4d04-b864-b35723e29777');
INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('588106b3-1f7a-47b6-9e29-f80eaea40171', 'Instagram', '123456789', 'active', 'e29ddd8e-e0eb-412d-ba1d-9b2924f3f3c8');
INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('7226d1d9-6d82-4be1-98ee-623c6988bd4f', 'Twitter', '1122334455', 'active', 'ab94517f-5354-4b88-918d-77ad1791f728');
INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('1c3ae318-22e5-446d-8469-913736160bbb', 'Instagram', '5566778899', 'suspended', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('e0b3a01c-6757-4134-a80c-34d57854a92d', 'Facebook', '123456789', 'suspended', '5ffe22da-1a43-4454-b363-5bc9bc49b0da');
INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('b692e884-b0bd-4c95-87d2-9b65332796ae', 'Twitter', '9988776655', 'verified', '4a43f688-b942-41a6-b564-94efe83e69ab');
INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('ca1f925a-7b38-4f29-a21d-bd95fda9d42f', 'Instagram', '5566778899', 'pending', '58da05b3-ae42-4d04-b864-b35723e29777');
INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('5e553c5f-33b4-4660-a0a5-a217dc582f09', 'Twitter', '5566778899', 'active', '1f20fd4a-6167-47c9-a778-62f3cfde0ea9');
INSERT INTO "SocialAccount" ("id", "platform", "accountId", "status", "userId") VALUES ('597d876d-5826-428d-a5da-4e1f5221d782', 'Twitter', '5566778899', 'suspended', '1f20fd4a-6167-47c9-a778-62f3cfde0ea9');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
