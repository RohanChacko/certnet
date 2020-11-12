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


export const getCertificate = certificateId =>
  fetch(`${host}/certificate/data/${certificateId}`, getHeader)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });

export const getCertificates = ownerId =>
  fetch(`${host}/certificates/data/${ownerId}`, getHeader)
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
  candidateName,
  courseName,
  orgName,
  assignDate,
  duration,
  emailId
) =>
  fetch(`${host}/certificate/generate/${ownerId}`, {
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
