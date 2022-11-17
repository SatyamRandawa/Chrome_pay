import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function Header() {
  const [Adddocument, setAdddocument] = useState([]);
  const [Notifications, setNotifications] = useState([]);

  const userlist = async () => {
    await axios.post(`/emailRequestsByOrg`).then((resp) => {
      let notdata = resp.data;
      let data = resp.data.findrequests;
      setNotifications(notdata);
      setAdddocument(data);
      console.log("==========>>>>>>>>>>>", data);
    });
  };

  useEffect(() => {
    userlist();
  }, []);

  const Readmeassage = (messege,receivedBy) => {
    Swal.fire({
        title: `${receivedBy}`,
        text: `${messege}`,
        padding:'2rem',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Go to page'
      }).then((result) => {
        if (result.isConfirmed) {
         window.location=`/organization-list-admin`;
        }
      })
  };

  return (
    <>
      <div id="kt_header" className="header align-items-stretch">
        <div className="container-fluid d-flex align-items-stretch justify-content-between">
          <div
            className="d-flex align-items-center d-lg-none ms-n3 me-1"
            title="Show aside menu"
          >
            <div
              className="btn btn-icon btn-active-color-primary w-40px h-40px"
              id="kt_aside_toggle"
            >
              <span className="svg-icon svg-icon-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                    fill="currentColor"
                  />
                  <path
                    opacity="0.3"
                    d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
            <Link to="/organization" className="d-lg-none">
              <img
                alt="Logo"
                src="/assets_new/media/logos/demo4-mobile.svg"
                className="h-25px"
              />
            </Link>
          </div>
          <div className="d-flex align-items-center" id="kt_header_wrapper">
            <div
              className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-20 pb-5 pb-lg-0"
              data-kt-swapper="true"
              data-kt-swapper-mode="prepend"
              data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_wrapper'}"
            >
              <h1 className="text-dark fw-bold my-1 fs-3 lh-1">
                <i className="fad fa-home-lg fs-3"></i> &nbsp;Welcome Back!
              </h1>
            </div>
          </div>

          <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
            <div
              className="d-flex align-items-stretch"
              id="kt_header_nav"
            ></div>
            <div className="d-flex align-items-stretch justify-self-end flex-shrink-0">
              <div className="d-flex align-items-center ms-1 ms-lg-3">
                <div
                  className="btn btn-icon btn-active-light-primary position-relative btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
                  data-kt-menu-trigger="click"
                  data-kt-menu-attach="parent"
                  data-kt-menu-placement="bottom-end"
                >
                  <span className="svg-icon svg-icon-1">
                    <span className="Card-design position-relative">
                      <i className="fad fa-bell-on fs-4"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {Notifications.totlaRow}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </span>
                  </span>
                </div>

                <div
                  className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
                  data-kt-menu="true"
                >
                  <div
                    className="d-flex flex-column bgi-no-repeat rounded-top"
                    style={{ background: "#3f8891" }}
                  >
                    <h3 className="text-white fw-semibold px-9 mt-10 mb-6">
                      Notifications
                      <span className="fs-8 opacity-75 ps-3">24 reports</span>
                    </h3>
                  </div>

                  <div className="tab-content">
                    <div
                      className=""
                      id="kt_topbar_notifications_1"
                      role="tabpanel"
                    >
                      <div className="scroll-y mh-325px my-5 px-8">
                        {/* Adddocument */}
                        {Adddocument.map((item) => (
                          <div
                            className="d-flex flex-stack py-4"
                            key={item._id}
                          >
                            <div className="d-flex align-items-center">
                              <div className="symbol symbol-35px me-4">
                                <span className="symbol-label bg-light-primary">
                                  <span className="svg-icon svg-icon-2 svg-icon-primary">
                                    <img
                                      src={item.logo}
                                      width="24"
                                      height="24"
                                    />
                                  </span>
                                </span>
                              </div>

                              <div className="mb-0 me-2"    onClick={() => Readmeassage(item.messege,item.receivedBy)}>
                                <a
                                  href="#"
                                  className="fs-6 text-gray-800 text-hover-primary fw-bold"
                                >
                                  {item.receivedBy}
                                </a>
                                <div className="text-gray-400 fs-7"    onClick={() => Readmeassage(item.messege,item.receivedBy)}>
                                  {item.subject}
                                </div>
                              </div>
                            </div>

                            <span
                              className="badge badge-light fs-8"
                              onClick={() => Readmeassage(item.messege,item.receivedBy)}
                            >
                              <i class="fas fa-chevron-right"></i>
                            </span>

                            
                            
                          </div>
                        ))}

                        {/* <div className="d-flex flex-stack py-4">

                                                        <div className="d-flex align-items-center">

                                                            <div className="symbol symbol-35px me-4">
                                                                <span className="symbol-label bg-light-danger">
                                                                    <span className="svg-icon svg-icon-2 svg-icon-danger">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor" />
                                                                            <rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="currentColor" />
                                                                            <rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="currentColor" />
                                                                        </svg>
                                                                    </span>

                                                                </span>
                                                            </div>

                                                            <div className="mb-0 me-2">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">HR
                                                                    Confidential</a>
                                                                <div className="text-gray-400 fs-7">Confidential staff
                                                                    documents</div>
                                                            </div>

                                                        </div>

                                                        <span className="badge badge-light fs-8">2 hrs</span>

                                                    </div>

                                                    <div className="d-flex flex-stack py-4">

                                                        <div className="d-flex align-items-center">

                                                            <div className="symbol symbol-35px me-4">
                                                                <span className="symbol-label bg-light-warning">
                                                                    <span className="svg-icon svg-icon-2 svg-icon-warning">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.3" d="M20 15H4C2.9 15 2 14.1 2 13V7C2 6.4 2.4 6 3 6H21C21.6 6 22 6.4 22 7V13C22 14.1 21.1 15 20 15ZM13 12H11C10.5 12 10 12.4 10 13V16C10 16.5 10.4 17 11 17H13C13.6 17 14 16.6 14 16V13C14 12.4 13.6 12 13 12Z" fill="currentColor" />
                                                                            <path d="M14 6V5H10V6H8V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V6H14ZM20 15H14V16C14 16.6 13.5 17 13 17H11C10.5 17 10 16.6 10 16V15H4C3.6 15 3.3 14.9 3 14.7V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V14.7C20.7 14.9 20.4 15 20 15Z" fill="currentColor" />
                                                                        </svg>
                                                                    </span>

                                                                </span>
                                                            </div>
                                                            <div className="mb-0 me-2">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Company
                                                                    HR</a>
                                                                <div className="text-gray-400 fs-7">Corporeate staff
                                                                    profiles</div>
                                                            </div>

                                                        </div>
                                                        <span className="badge badge-light fs-8">5 hrs</span>

                                                    </div>
                                                    <div className="d-flex flex-stack py-4">
                                                        <div className="d-flex align-items-center">

                                                            <div className="symbol symbol-35px me-4">
                                                                <span className="symbol-label bg-light-success">
                                                                    <span className="svg-icon svg-icon-2 svg-icon-success">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.3" d="M5 15C3.3 15 2 13.7 2 12C2 10.3 3.3 9 5 9H5.10001C5.00001 8.7 5 8.3 5 8C5 5.2 7.2 3 10 3C11.9 3 13.5 4 14.3 5.5C14.8 5.2 15.4 5 16 5C17.7 5 19 6.3 19 8C19 8.4 18.9 8.7 18.8 9C18.9 9 18.9 9 19 9C20.7 9 22 10.3 22 12C22 13.7 20.7 15 19 15H5ZM5 12.6H13L9.7 9.29999C9.3 8.89999 8.7 8.89999 8.3 9.29999L5 12.6Z" fill="currentColor" />
                                                                            <path d="M17 17.4V12C17 11.4 16.6 11 16 11C15.4 11 15 11.4 15 12V17.4H17Z" fill="currentColor" />
                                                                            <path opacity="0.3" d="M12 17.4H20L16.7 20.7C16.3 21.1 15.7 21.1 15.3 20.7L12 17.4Z" fill="currentColor" />
                                                                            <path d="M8 12.6V18C8 18.6 8.4 19 9 19C9.6 19 10 18.6 10 18V12.6H8Z" fill="currentColor" />
                                                                        </svg>
                                                                    </span>

                                                                </span>
                                                            </div>


                                                            <div className="mb-0 me-2">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Project
                                                                    Redux</a>
                                                                <div className="text-gray-400 fs-7">New frontend admin theme
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <span className="badge badge-light fs-8">2 days</span>

                                                    </div>

                                                    <div className="d-flex flex-stack py-4">

                                                        <div className="d-flex align-items-center">

                                                            <div className="symbol symbol-35px me-4">
                                                                <span className="symbol-label bg-light-primary">
                                                                    <span className="svg-icon svg-icon-2 svg-icon-primary">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.3" d="M6 22H4V3C4 2.4 4.4 2 5 2C5.6 2 6 2.4 6 3V22Z" fill="currentColor" />
                                                                            <path d="M18 14H4V4H18C18.8 4 19.2 4.9 18.7 5.5L16 9L18.8 12.5C19.3 13.1 18.8 14 18 14Z" fill="currentColor" />
                                                                        </svg>
                                                                    </span>

                                                                </span>
                                                            </div>

                                                            <div className="mb-0 me-2">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Project
                                                                    Breafing</a>
                                                                <div className="text-gray-400 fs-7">Product launch status
                                                                    update</div>
                                                            </div>

                                                        </div>

                                                        <span className="badge badge-light fs-8">21 Jan</span>

                                                    </div>

                                                    <div className="d-flex flex-stack py-4">

                                                        <div className="d-flex align-items-center">

                                                            <div className="symbol symbol-35px me-4">
                                                                <span className="symbol-label bg-light-info">
                                                                    <span className="svg-icon svg-icon-2 svg-icon-info">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.3" d="M22 5V19C22 19.6 21.6 20 21 20H19.5L11.9 12.4C11.5 12 10.9 12 10.5 12.4L3 20C2.5 20 2 19.5 2 19V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5ZM7.5 7C6.7 7 6 7.7 6 8.5C6 9.3 6.7 10 7.5 10C8.3 10 9 9.3 9 8.5C9 7.7 8.3 7 7.5 7Z" fill="currentColor" />
                                                                            <path d="M19.1 10C18.7 9.60001 18.1 9.60001 17.7 10L10.7 17H2V19C2 19.6 2.4 20 3 20H21C21.6 20 22 19.6 22 19V12.9L19.1 10Z" fill="currentColor" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            <div className="mb-0 me-2">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Banner
                                                                    Assets</a>
                                                                <div className="text-gray-400 fs-7">Collection of banner
                                                                    images</div>
                                                            </div>

                                                        </div>

                                                        <span className="badge badge-light fs-8">21 Jan</span>
                                                    </div>

                                                    <div className="d-flex flex-stack py-4">

                                                        <div className="d-flex align-items-center">

                                                            <div className="symbol symbol-35px me-4">
                                                                <span className="symbol-label bg-light-warning">
                                                                    <span className="svg-icon svg-icon-2 svg-icon-warning">
                                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path opacity="0.3" d="M8.9 21L7.19999 22.6999C6.79999 23.0999 6.2 23.0999 5.8 22.6999L4.1 21H8.9ZM4 16.0999L2.3 17.8C1.9 18.2 1.9 18.7999 2.3 19.1999L4 20.9V16.0999ZM19.3 9.1999L15.8 5.6999C15.4 5.2999 14.8 5.2999 14.4 5.6999L9 11.0999V21L19.3 10.6999C19.7 10.2999 19.7 9.5999 19.3 9.1999Z" fill="currentColor" />
                                                                            <path d="M21 15V20C21 20.6 20.6 21 20 21H11.8L18.8 14H20C20.6 14 21 14.4 21 15ZM10 21V4C10 3.4 9.6 3 9 3H4C3.4 3 3 3.4 3 4V21C3 21.6 3.4 22 4 22H9C9.6 22 10 21.6 10 21ZM7.5 18.5C7.5 19.1 7.1 19.5 6.5 19.5C5.9 19.5 5.5 19.1 5.5 18.5C5.5 17.9 5.9 17.5 6.5 17.5C7.1 17.5 7.5 17.9 7.5 18.5Z" fill="currentColor" />
                                                                        </svg>
                                                                    </span>

                                                                </span>
                                                            </div>

                                                            <div className="mb-0 me-2">
                                                                <a href="#" className="fs-6 text-gray-800 text-hover-primary fw-bold">Icon
                                                                    Assets</a>
                                                                <div className="text-gray-400 fs-7">Collection of SVG icons
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <span className="badge badge-light fs-8">20 March</span>

                                                    </div> */}
                      </div>

                      <div className="py-3 text-center border-top">
                        <a
                          href="pages/user-profile/#"
                          className="btn btn-color-gray-600 btn-active-color-primary"
                        >
                          View All
                          <span className="svg-icon svg-icon-5">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                opacity="0.5"
                                x="18"
                                y="13"
                                width="13"
                                height="2"
                                rx="1"
                                transform="rotate(-180 18 13)"
                                fill="currentColor"
                              />
                              <path
                                d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center ms-1 ms-lg-3  mr-3">
                <div
                  className="btn btn-icon btn-active-light-primary position-relative btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
                  id="kt_drawer_chat_toggle"
                >
                  <span className="svg-icon svg-icon-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z"
                        fill="currentColor"
                      />
                      <rect
                        x="6"
                        y="12"
                        width="7"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      />
                      <rect
                        x="6"
                        y="7"
                        width="12"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink"></span>
                </div>
              </div>

              <div
                className="d-flex align-items-center ms-1 ms-lg-3"
                id="kt_header_user_menu_toggle"
              >
                <div
                  className="cursor-pointer symbol symbol-30px symbol-md-40px"
                  data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                  data-kt-menu-attach="parent"
                  data-kt-menu-placement="bottom-end"
                >
                  {/* <img src="/assets_new/images/user.jpg" alt="user" /> */}
                  <i class="fad fa-user-circle fs-33"></i>
                </div>
                <div
                  className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                  data-kt-menu="true"
                >
                  <div className="menu-item px-3">
                    <div className="menu-content d-flex align-items-center px-3">
                      <div className="symbol symbol-50px me-5">
                        <img alt="Logo" src="/assets_new/images/user.jpg" />
                      </div>
                      <div className="d-flex flex-column">
                        <div className="fw-bold d-flex align-items-center fs-5">
                          Sumit Hariyani
                          <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                            Admin
                          </span>
                        </div>
                        <a
                          href="#"
                          className="fw-semibold text-muted text-hover-primary fs-7"
                        >
                          sumit@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="separator my-2"></div>

                  <div className="menu-item px-5">
                    <a href="#" className="menu-link px-5">
                      My Profile
                    </a>
                  </div>

                  <div className="menu-item px-5 my-1">
                    <a href="#" className="menu-link px-5">
                      Account Settings
                    </a>
                  </div>

                  <div className="menu-item px-5">
                    <a href="#" className="menu-link px-5">
                      Sign Out
                    </a>
                  </div>
                  <div className="separator my-2"></div>
                </div>
              </div>

              <div
                className="d-flex align-items-center d-lg-none ms-3 me-n1"
                title="Show header menu"
              >
                <div
                  className="btn btn-icon btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
                  id="kt_header_menu_mobile_toggle"
                >
                  <span className="svg-icon svg-icon-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.3"
                        d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}