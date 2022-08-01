import { formatUserDTO } from './../dto/format-user.dto';
export function formatUser(user: formatUserDTO) {
  const serializedUser = {
    ...user,
    transactions: user.senderPerson,
  };

  delete serializedUser.senderPerson;

  return serializedUser;
}
