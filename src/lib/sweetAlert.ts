/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { Messages } from "./config";
import i18n from "../i18n";

const knownErrors: Record<string, string> = {
  [Messages.error1]: "errors.generic",
  [Messages.error2]: "errors.login",
  [Messages.error3]: "errors.fill",
  [Messages.error4]: "errors.empty",
  [Messages.error5]: "errors.image",
};

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const raw = error?.message ?? Messages.error1;
  const message = knownErrors[raw] ? String(i18n.t(knownErrors[raw])) : raw;
  await Swal.fire({
    icon: "error",
    text: message,
    showConfirmButton: false,
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
  });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};
