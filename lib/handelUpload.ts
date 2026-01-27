import { upload } from "@imagekit/next";

export const authenticator = async () => {
  try {
    const response = await fetch("/api/upload-auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

export const uploadToImageKit = async (file: File) => {
  const { signature, expire, token, publicKey } = await authenticator();
  const response = await upload({
    file,
    fileName: file.name,
    expire,
    token,
    signature,
    publicKey,
    folder: "/BccPaymentScreenshots",
    useUniqueFileName: true,
  });
  return response;
};


