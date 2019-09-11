import { IUser } from "../../../../../interfaces/models/IUser";
import { IUserDetails } from "../../../../../interfaces/models/IUserDetails";
import { IUserService } from "../../../../../interfaces/services/IUserService";
import { IUserDetailsService } from "../../../../../interfaces/services/IUserDetailsService";
import { IPermissionService } from "../../../../../interfaces/services/IPermissionService";
import { UserContoller } from "../User.Controller";

const testingIUser: IUser = {
  id: "testing123",
  username: "testing",
  password: "testing",
};

const testingIUserDetails: IUserDetails = {
  firstName: "testing",
  middleName: "testing",
  lastName: "testing",
  address: "testing",
  emailAddress: "testing@testing.com",
  dateOfBirth: new Date(),
  phoneNumber: "testing",
};

// @ts-ignore
const mockedIUserService: IUserService = {
  createUser: jest.fn().mockResolvedValue({...testingIUser}),
  sendConfirmationOfDeletion: jest.fn(),
  findDeletionConfirmation: jest.fn().mockResolvedValue({...testingIUser}),
  destroyUser: jest.fn().mockResolvedValue(true),
};

// @ts-ignore
const mockedIUserDetailsService: IUserDetailsService = {
  createDetails: jest.fn(),
};

describe("UserController (Unit)", () => {

  const sut = new UserContoller(mockedIUserService, mockedIUserDetailsService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {

    it("should return an object with a message prop when username is already taken", async () => {

      // Arrange
      const user = {...testingIUser};
      mockedIUserService.createUser =
        jest.fn().mockImplementation(() => { throw new Error("Username is already taken"); });

      // Act
      const result = await sut.createUser(user);

      // Assert
      expect(result.message).toBe("Username is already taken");

    });

    it("should return an object with an id prop when username is not taken", async () => {

      // Arrange
      const user = {...testingIUser};
      mockedIUserService.createUser = jest.fn().mockResolvedValue({...testingIUser});

      // Act
      const result = await sut.createUser(user);

      // Assert
      expect(result.id).not.toBeNull();

    });

  });

  describe("createUserAndDetails", () => {

    it("should call UserService.createUser() with user details object", async () => {

      // Arrange
      const userDetails = {...testingIUser, ...testingIUserDetails};

      // Act
      await sut.createUserAndDetails(userDetails);

      // Assert
      expect(mockedIUserService.createUser).toBeCalledWith({...userDetails});

    });

    it("should call UserDetailsService.createDetails() wuth user details object and user id", async () => {

      // Arrange
      const userDetails = {...testingIUser, ...testingIUserDetails};

      // Act
      await sut.createUserAndDetails(userDetails);

      // Assert
      expect(mockedIUserDetailsService.createDetails).toBeCalledWith(userDetails, testingIUser.id);

    });

  });

  describe("deleteUser", () => {

    it("should call UserService.sendConfirmationOfDeletion() with user id", async () => {

      // Arrange
      const user = {...testingIUser};

      // Act
      // @ts-ignore
      await sut.deleteUser(user);

      // Assert
      expect(mockedIUserService.sendConfirmationOfDeletion).toBeCalledWith(testingIUser.id);

    });

  });

  describe("confirmDeleteUser", () => {

    it("should return an object with a message when user does not have a confirmation for deletion", async () => {

      // Arrange
      const confirmationString = "testing";
      mockedIUserService.findDeletionConfirmation = jest.fn().mockResolvedValue(false);

      // Act
      const result = await sut.confirmDeleteUser(confirmationString);

      // Assert
      expect(result.message).not.toBeNull();

    });

    it("should call UserService.destroyUser() when user has a confirmation for deletion", async () => {

      // Arrange
      const confirmationString = "testing";
      mockedIUserService.findDeletionConfirmation = jest.fn().mockResolvedValue({userId: testingIUser.id});

      // Act
      await sut.confirmDeleteUser(confirmationString);

      // Assert
      expect(mockedIUserService.destroyUser).toBeCalledWith(testingIUser.id);

    });

    it("should return an object with an id when user has a confirmation for deletion", async () => {

      // Arrange
      const confirmationString = "testing";
      mockedIUserService.findDeletionConfirmation = jest.fn().mockResolvedValue(false);

      // Act
      const result = await sut.confirmDeleteUser(confirmationString);

      // Assert
      expect(result.userIdDestroyed).not.toBeNull();

    });

  });

  describe("updateUser", () => {

    it("should call User.save()", async () => {

      // Arrange
      const user = {...testingIUser, ...testingIUserDetails};
      const userInstance = {save: jest.fn().mockResolvedValue(null)};

      // Act
      // @ts-ignore
      await sut.updateUser(user, userInstance);

      // Assert
      expect(userInstance.save).toBeCalled();

    });

  });

});
