import { CreateUserParams, SignInParams, UserData } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.jsm.fooddelivery",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "68e5f46a0020932a4591",
  userCollectionId: "user",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export const CreateUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl: URL = avatars.getInitialsURL(name);

    return await databases.createDocument<UserData>(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        name,
        email,
        accountId: newAccount.$id,
        avatar: avatarUrl.toString(),
      },
    );
  } catch (e) {
    throw new Error(e as string);
  }
};

export const signIn = async ({
  email,
  password,
}: SignInParams): Promise<void> => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (e) {
    
  }
};
