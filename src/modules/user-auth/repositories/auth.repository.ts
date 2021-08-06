import { Repository, EntityRepository } from "typeorm";
import { genSalt, hash } from "bcryptjs";
import { User } from "../../user-account/user.entity";
import { UserRegisterDto } from "../dto/user-register.dto";
import { UserProfile } from "../../user-account/user.profile.entity";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {

  async register(userRegisterDto: UserRegisterDto) {


    const user = new User();
    const userprofile = new UserProfile();
    user.username = userRegisterDto.phone_number;
    userprofile.full_name = userRegisterDto.name;
    userprofile.gender = userRegisterDto.gender;
    userprofile.ekyc = false
    userprofile.created_at = new Date();
    user.activate = 1;
    user.activated_at = new Date();
    user.created_at = new Date();
    const salt = await genSalt(10);
    user.password = await hash(userRegisterDto.password, salt);

    user.Profile = userprofile;
    
    await user.save();
    return user.id
  }
}