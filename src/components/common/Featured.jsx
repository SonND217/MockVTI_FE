import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faShippingFast,
  faExchangeAlt,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";

function Featured() {
  return (
    <div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="text-primary m-0 mr-3"
                size="lg"
              />
              <h5 className="font-weight-semi-bold m-0">Sản phầm chất lượng</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <FontAwesomeIcon
                icon={faShippingFast}
                className="text-primary m-0 mr-2"
                size="lg"
              />
              <h5 className="font-weight-semi-bold m-0">Miễn phí giao hàng</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <FontAwesomeIcon
                icon={faExchangeAlt}
                className="text-primary m-0 mr-3"
                size="lg"
              />
              <h5 className="font-weight-semi-bold m-0">
                Hoàn trả trong 14 ngày
              </h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <FontAwesomeIcon
                icon={faPhoneVolume}
                className="text-primary m-0 mr-3"
                size="lg"
              />
              <h5 className="font-weight-semi-bold m-0">Hỗ trợ mọi lúc 24/7</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
