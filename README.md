# PassMe
## Introduction
PassMe is a Password Management System for storing and managing passwords. <br/>
This report will outline the project vision, background, features and chalenges of this project.

## Project Vision
As the world is digitalizing, especially in this 21st century, many users of the internet get registered into different online platforms using a username/email address and a password for every different platform registered. The number of platforms registered overtime becomes much, and this brings about the difficulty to remember all the password information for each registered account. <br/>
To Avert this, many people adopted the use of a few passwords across different platforms, as so not to forget their passwords. As you know, this is not a good practice because it exposes you to a lot of threats and attacks when your password is breached. In turn, People that have many passwords tend to forget their passwords as the number of cyber accounts registered increases over time. This brought forth the idea of building a password management system that can help users remember their passwords for each registered account. <br/>
The PassMe system is a single page application for easy management and retrieval of passwords. With the system, the user doesn’t have to remember passwords, rather, the system will store specific passwords information for specific accounts making it easily accessible anytime via a browser. The user can also edit these password information as it changes. Also add new password accounts or delete ones that are no longer in use. This system also shows you the password strength of your password and hints where amendment is needed so to create a strong password, this thereby increases security.

## Background
This project will be implemented as a single page application using HTML, CSS, JavaScript, and JASON output to store data on the browser’s localstorage. Accessible via a browser. This makes it easily accessible as almost everything in this 21st century is revolving around the cyber space.
This system is a one-user system and does not allow for multiple users. This is because the system is meant to hold the password information for a specific user’s account over the internet space.
This system, for security reasons and to prevent data breaching will require a user password before it is accessed. This password will be set by the user at the first instance of using the system, to safeguard all password information stored within the system. As passwords are confidential and vulnerable to attack, the system will be locked with a master password to protect the data stored in the system.

## Features
The system is locked with a master password required at startup to access the system. Upon entering a matching username and password, the system dashboard is displayed, giving access to the functionalities of the system, which includes; Add Account, Search, View Account, Edit Account, Delete Account, Admin Account, and Logout. The user at the first instance of using the system is prompted to create the Admin, this Admin information is used to authenticate the user to use the system.<br/>
The Add Account feature enables the user to add a password account information through a form input, providing the application, username, email, and password of the account. <br/>
The Search feature enables the user to search a record using a keyword (username or application).<br/>
View Account lists out in a table, all the records as stored in the system, showing the password strength of the passwords and hints to change if weak. Here also are two buttons, Edit and Delete, through which the user can modity existing record, or delete it.
The Admin Account gives room for changing the master password through the Change Password feature. And Logout to lock the system.<br/>
This system is Single Page Application therefore all the features are implemented into a single index page, being manipulated with the help of AJAX to change content of the page.

## Chalenges and Constraits
The main constraint of this system is the fact that the system does not provide any form of encryption for the stored data. The data is stored as provided by the user, passwords and record information is not encrypted. This makes the system vulnerables.<br/>
Also, the system data is store within the browser's localstorage. The local storage is a temporary storage space on the browser which means that the system data stored is cleared once the browser's cookie is cleared. Also, the localstorage is subject to attack through Cross-Site Scripting, making the data stored within the localstorage vulnerable and unsafe.


