// tslint:disable:max-line-length

import { News } from "../src/modules/database/models/News.Model";
import "../src/modules/database/DatabaseConnection";
import { User } from "../src/modules/database/models/User.Model";
import { UserDetails } from "../src/modules/database/models/UserDetails.Model";
import { generate } from "randomstring";

(async function main() {
  const user = await User.create({
    username: generate({charset: "alphanumeric", length: 10}),
    password: "`Testing - ${i}X",
  });

  const details = await UserDetails.create({
    userId: user.id,
    firstName: "contactFirstName",
    middleName: "contactMiddleName",
    lastName: "contactLastName",
    address: "contactAddress",
    phoneNumber: "contactPhoneNumber",
    emailAddress: "contactEmailAddress",
    dateOfBirth: "05-29-1998",
  });

  for (let i = 0; i < 10; i++) {
    await News.create({
      headline: `News Title ${generate({charset: "alphanumeric", length: 10})}`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare aenean euismod elementum nisi. Lorem mollis aliquam ut porttitor leo a diam. Hac habitasse platea dictumst vestibulum. Erat pellentesque adipiscing commodo elit at imperdiet dui. Rutrum quisque non tellus orci ac auctor. Gravida in fermentum et sollicitudin ac orci phasellus. Eget nunc lobortis mattis aliquam. A condimentum vitae sapien pellentesque habitant. Sit amet consectetur adipiscing elit pellentesque habitant. Lacus sed turpis tincidunt id. Eros donec ac odio tempor orci dapibus ultrices in. Condimentum mattis pellentesque id nibh tortor id. Massa tincidunt nunc pulvinar sapien et. Eu turpis egestas pretium aenean pharetra magna ac. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Consequat id porta nibh venenatis. Est ullamcorper eget nulla facilisi etiam dignissim.

      Eget dolor morbi non arcu risus quis varius quam quisque. Et pharetra pharetra massa massa. Fringilla urna porttitor rhoncus dolor purus non enim praesent. Nulla porttitor massa id neque aliquam. Blandit turpis cursus in hac. Hac habitasse platea dictumst quisque. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Aliquet porttitor lacus luctus accumsan tortor posuere. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Morbi tristique senectus et netus et malesuada fames ac. Eget gravida cum sociis natoque penatibus. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Scelerisque purus semper eget duis at tellus at urna condimentum. Habitant morbi tristique senectus et netus et.

      Orci ac auctor augue mauris augue neque gravida in fermentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Pellentesque elit eget gravida cum sociis natoque penatibus et. Nunc sed velit dignissim sodales ut. Volutpat diam ut venenatis tellus in metus vulputate eu. Ornare aenean euismod elementum nisi quis eleifend. Et tortor at risus viverra adipiscing at. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Montes nascetur ridiculus mus mauris vitae ultricies. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Pharetra magna ac placerat vestibulum lectus mauris. Consequat interdum varius sit amet mattis vulputate enim nulla aliquet. Sagittis purus sit amet volutpat consequat mauris. Libero volutpat sed cras ornare arcu dui. Scelerisque eleifend donec pretium vulputate sapien. Amet porttitor eget dolor morbi non.

      Egestas maecenas pharetra convallis posuere. Luctus accumsan tortor posuere ac. Ultrices eros in cursus turpis. Amet venenatis urna cursus eget nunc scelerisque. Duis at tellus at urna condimentum mattis pellentesque id nibh. Pharetra diam sit amet nisl suscipit. Sit amet volutpat consequat mauris nunc congue nisi vitae. Placerat vestibulum lectus mauris ultrices eros. Neque viverra justo nec ultrices dui sapien eget mi. Tellus molestie nunc non blandit. Scelerisque eleifend donec pretium vulputate sapien nec sagittis.

      Molestie ac feugiat sed lectus. Semper eget duis at tellus at urna condimentum. Interdum velit laoreet id donec ultrices tincidunt arcu non sodales. At elementum eu facilisis sed odio morbi. Enim nulla aliquet porttitor lacus. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Purus sit amet luctus venenatis. Sit amet est placerat in egestas erat. Id interdum velit laoreet id donec ultrices tincidunt. Eget duis at tellus at urna condimentum. Amet aliquam id diam maecenas ultricies mi eget. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Id neque aliquam vestibulum morbi blandit. Enim diam vulputate ut pharetra. Id velit ut tortor pretium. Placerat in egestas erat imperdiet sed euismod nisi. Eget aliquet nibh praesent tristique. Faucibus a pellentesque sit amet porttitor eget dolor morbi non.`,
      author: user.id,
    });
  }

  process.exit(0);
})();
