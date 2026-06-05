import bcrypt from "bcrypt";

export const hash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const  compare = async(password: string, hashedPassword: string) =>{
        return await bcrypt.compare(password, hashedPassword)
}

