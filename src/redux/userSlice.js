const initialState = {
  firstName: "",
  lastName: "",
  about: "",
  email: "",
  experiences: null,
  username: "",
  password: "",
  projects: null,
  github: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  tagLine: "",
};

export const setAllDetailsAsync = ({
  email,
  password,
  firstName,
  lastName,
  experiences,
  about,
  username,
  projects,
  github,
  instagram,
  twitter,
  linkedin,
}) => {
  return async (dispatch) => {
    try {
      // Dispatch the action on success
      dispatch({
        type: "set_all_details",
        payload: {
          email,
          password,
          firstName,
          lastName,
          experiences,
          about,
          username,
          projects,
          github,
          instagram,
          twitter,
          linkedin,
        },
      });
    } catch (error) {
      // Handle errors
      console.error("Failed to update user details:", error);
    }
  };
};

export const setAllDetails = ({
  email,
  password,
  firstName,
  lastName,
  experiences,
  about,
  username,
  projects,
  github,
  instagram,
  twitter,
  linkedin,
  tagLine,
}) => ({
  type: "set_all_details",
  payload: {
    email,
    password,
    username,
    firstName,
    lastName,
    about,
    experiences,
    projects,
    github,
    instagram,
    twitter,
    linkedin,
    tagLine,
  },
});

export const setUsername = ({ username }) => ({
  type: "set_username",
  payload: {
    username,
  },
});

export const setEmailPass = ({ email, password, username }) => ({
  type: "set_email_password",
  payload: {
    email,
    password,
    username,
  },
});

export const setId = ({ id }) => ({
  type: "USER_ID",
  payload: {
    id,
  },
});

export const setUserData = ({
  firstName,
  lastName,
  about,
  email,
  currentCompany,
  currentPosition,
  exp,
}) => ({
  type: "USER_DETAILS",
  payload: {
    firstName,
    lastName,
    about,
    email,
    currentCompany,
    currentPosition,
    exp,
  },
});

export const updatePersonalDetails = ({ firstName, lastName }) => ({
  type: "personal_details",
  payload: {
    firstName,
    lastName,
  },
});

export const updateUserExperience = ({ experiences }) => ({
  type: "USER_EXPERIENCES",
  payload: {
    experiences,
  },
});

export const updateUserInfo = ({ firstName, lastName }) => ({
  type: "USER_INFO",
  payload: {
    firstName,
    lastName,
  },
});

export const updateAbout = ({ about }) => ({
  type: "USER_ABOUT",
  payload: {
    about,
  },
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_INFO":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };

    case "USER_ABOUT":
      return {
        ...state,
        about: action.payload.about,
      };

    case "USER_EXPERIENCES":
      return {
        ...state,
        experiences: action.payload.experiences,
      };

    case "USER_DETAILS":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        about: action.payload.about,
        email: action.payload.email,
        currentCompany: action.payload.currentCompany,
        currentPosition: action.payload.currentPosition,
        experiences: action.payload.exp,
      };

    case "personal_details":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };

    case "USER_ID":
      return {
        ...state,
        id: action.payload.id,
      };

    case "set_email_password":
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        username: action.payload.username,
      };

    case "set_username":
      return {
        ...state,
        username: action.payload.username,
      };

    case "set_all_details":
      return {
        ...state,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        about: action.payload.about,
        experiences: action.payload.experiences,
        email: action.payload.email,
        password: action.payload.password,
        projects: action.payload.projects,
        github: action.payload.github,
        twitter: action.payload.twitter,
        instagram: action.payload.instagram,
        linkedin: action.payload.linkedin,
        tagLine: action.payload.tagLine,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
