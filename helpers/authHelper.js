import bcrypt from "bcrypt";
export const hashPassward = async (passward) => {
  try {
    const saltRounds = 10;
    const hashedPassward = await bcrypt.hash(passward, saltRounds);
    return hashedPassward;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassward = async (passward, hashedPassward) => {
  return bcrypt.compare(passward, hashedPassward);
};
