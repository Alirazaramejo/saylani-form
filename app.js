import { app } from "./config.js";

import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

const picInputDiv = document.querySelector("#picInputDiv");
const picInput = document.querySelector("#picInput");
const profileImg = document.querySelector("#profileImg");
const profilePicDiv = document.querySelector(".profilePicDiv");
const submitBtn = document.querySelector(".submitBtn");
const loader = document.querySelector(".spinner-border");
let imgUrl;

const downloadImageUrl = (file) => {
    return new Promise((resolve, reject) => {
        const profileImagesRef = ref(storage, `images/${file.name}/`);
        const uploadTask = uploadBytesResumable(profileImagesRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                        profilePicDiv.innerHTML = `
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        `
                        break;
                }
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        );
    });
};

picInputDiv.addEventListener("click", () => {
    picInput.click();
})

picInput.addEventListener("change", async () => {
    if (picInput.files.length > 0) {
        profilePicDiv.style.display = "flex";
        const file = picInput.files[0];
        imgUrl = await downloadImageUrl(file);
        if (imgUrl) {
            profilePicDiv.innerHTML = `
            <img src="${imgUrl}" id="profileImg">
            `
        }
    }
})

submitBtn.addEventListener("click", async () => {
    const selectCity = document.getElementById("select-city");
    const selectCourse = document.getElementById("select-course");
    const nameInput = document.getElementById("nameInput");
    const fatherNameInput = document.getElementById("fatherNameInput");
    const emailInput = document.getElementById("emailInput");
    const phoneInput = document.getElementById("phoneInput");
    const cnicInput = document.getElementById("cnicInput");
    const fatherCnicInput = document.getElementById("fatherCnicInput");
    const dateInput = document.getElementById("dateInput");
    const selectGender = document.getElementById("select-gender");
    const addressInput = document.getElementById("addressInput");
    const lastQualification = document.getElementById("last-qualification");
    const haveLaptop = document.getElementById("have-laptop");

    const city = selectCity.value;
    const course = selectCourse.value;
    const name = nameInput.value;
    const fatherName = fatherNameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const cnic = cnicInput.value;
    let fatherCnic
    if (fatherCnicInput) {
        fatherCnic = fatherCnicInput.value;
    } else {
        fatherCnic = "";
    }
    const dateOfBirth = dateInput.value;
    const gender = selectGender.value;
    const address = addressInput.value;
    const qualification = lastQualification.value;
    const laptopAvailable = haveLaptop.value;

    if (!city) {
        location.href = "#select-city";
    } else if (!course) {
        location.href = "#select-course";
    } else if (!name) {
        location.href = "#nameInput";
    } else if (!fatherName) {
        location.href = "#fatherNameInput";
    } else if (!email) {
        location.href = "#emailInput";
    } else if (!phone) {
        location.href = "#phoneInput";
    } else if (!cnic) {
        location.href = "#cnicInput";
    } else if (!dateOfBirth) {
        location.href = "#dateInput";
    } else if (!gender) {
        location.href = "#select-gender";
    } else if (!address) {
        location.href = "#addressInput";
    } else if (!qualification) {
        location.href = "#last-qualification";
    } else if (!laptopAvailable) {
        location.href = "#have-laptop";
    } else if (!imgUrl) {
        location.href = "#picInput"
    } else {
        const studentData = {
            city,
            course,
            name,
            fatherName,
            email,
            phone,
            cnic,
            fatherCnic,
            dateOfBirth,
            gender,
            address,
            qualification,
            laptopAvailable,
            imgUrl
        }
        try {
            submitBtn.innerHTML = `
            <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
            </div>
            `;
            await setDoc(doc(db, "students", cnic), {

                // })
                // await addDoc(collection(db, "students"), {
                ...studentData
            });
            submitBtn.innerHTML = `
            Submit
            `;

            Swal.fire({
                title: "Good job!",
                text: "Your form has been successfully submitted!",
                icon: "success"
            });


            selectCity.value = "";
            selectCity.value = "";
            nameInput.value = "";
            fatherNameInput.value = "";
            emailInput.value = "";
            phoneInput.value = "";
            cnicInput.value = "";
            fatherCnicInput.value = "";
            dateInput.value = "";
            selectCourse.value = "";
            addressInput.value = "";
            lastQualification.value = "";
            haveLaptop.value = "";
            profilePicDiv.style.display = "none";

        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    }

})