import React from "react";
import Styles from "/styles/scss/dashboard/Card.module.scss";
export default function CardDashboard({
  leftIcon,
  rightIcon,
  counter,
  text,
  vectorIcon,
  background,
}) {
  return (
    <div
      className={`card-event mb-lg-0 mb-4 ${Styles.card}`}
      style={{ backgroundColor: background }}
    >
      <div className={Styles.cardBody}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`m-0 ${Styles.parentLeftIcon}`}>{leftIcon}</div>
          </div>
          <div>
            <span className="float-right">{vectorIcon}</span>
          </div>
          <div>
            <span className="float-right">{rightIcon}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`mt-2 mb-0 ${Styles.counter}`}>
              {counter} . <span>1.567 online</span>
            </h2>
            <h6 className={`mb-0 ${Styles.text}`}>
              {text} . <span>3.455.975</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
