import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "LRia6UCIFTNKI5OW70mHvLa2Jg7K46819o1Ki4QAA7Y";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "1d";

export interface TokenPayload {
  id: string; // Maps to idUser
  email: string;
  roleId: number; // Maps to idRole
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as any);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "30d" });
};
