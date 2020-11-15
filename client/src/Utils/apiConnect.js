const getHeader = {
  headers: {
    Accept: "application/json"
  }
};

const postHeader = {
  method: "POST",
  headers: {
    ...getHeader,
    "Content-Type": "application/json"
  }
};

let host = "";

host = "http://localhost:3001";

export const getUser = studentId =>
  fetch(`${host}/user/data/${studentId}`, getHeader)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });

export const getStudents =
  fetch(`${host}/users/data/students`, getHeader)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });

export const generateUser = (
  name,
  givenName,
  familyName,
  imageUrl,
  email,
  type
) =>

  fetch(`${host}/user/generate`, {
    ...postHeader,
    body: JSON.stringify({
      name,
      givenName,
      familyName,
      imageUrl,
      email,
      type
    })
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });

export const getCertificate = certificateId =>
  fetch(`${host}/certificate/data/${certificateId}`, getHeader)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });

export const getCertificates = (ownerId, studentId) =>
  fetch(`${host}/certificates/data/${ownerId}&${studentId}`, getHeader)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });

export const verifyCertificate = certificateId =>
  fetch(`${host}/certificate/verify/${certificateId}`, getHeader)
    .then(res => {
      if (res.status === 200) return true;
      else if (res.status === 401) return false;
    })
    .catch(err => {
      console.log(err);
    });

export const generateCertificate = (
  ownerId,
  studentId,
  candidateName,
  courseName,
  orgName,
  assignDate,
  duration,
  emailId
) =>
  fetch(`${host}/certificate/generate/${ownerId}&${studentId}`, {
    ...postHeader,
    body: JSON.stringify({
      candidateName,
      courseName,
      orgName,
      assignDate,
      duration,
      emailId
    })
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });
