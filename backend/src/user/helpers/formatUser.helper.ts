import { formatUserDTO } from './../dto/format-user.dto';
export function formatUser(user: formatUserDTO) {
  const serializedUser = {
    ...user,
    madeTransactions: user.senderPerson,
    receivedTransactions: user.recipientPerson,
  };

  delete serializedUser.senderPerson;
  delete serializedUser.recipientPerson;

  return serializedUser;
}
