import React from "react";
import Cat1 from "../../assets/img/cat-1.jpg";
import Cat2 from "../../assets/img/cat-2.jpg";
import Cat3 from "../../assets/img/cat-3.jpg";

function Categories() {
  return (
    <div className="container-fluid pt-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Danh mục mặt hàng</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        {/* Column 1 */}
        <div className="col-lg-4 col-md-4 col-sm-12 pb-1">
          <a className="text-decoration-none" href="">
            <div className="cat-item img-zoom d-flex align-items-center mb-4">
              <div
                className="overflow-hidden"
                style={{ width: "100px", height: "100px" }}
              >
                <img className="img-fluid" src={Cat1} alt="Category 1" />
              </div>
              <div className="flex-fill pl-3">
                <h6>Laptop</h6>
                <small className="text-body">Laptop Văn Phòng, Gaming</small>
              </div>
            </div>
          </a>
        </div>
        {/* Column 2 */}
        <div className="col-lg-4 col-md-4 col-sm-12 pb-1">
          <a className="text-decoration-none" href="">
            <div className="cat-item img-zoom d-flex align-items-center mb-4">
              <div
                className="overflow-hidden"
                style={{ width: "100px", height: "100px" }}
              >
                <img className="img-fluid" src={Cat2} alt="Category 2" />
              </div>
              <div className="flex-fill pl-3">
                <h6>Điện thoại</h6>
                <small className="text-body">Điện thoại mới nhất</small>
              </div>
            </div>
          </a>
        </div>
        {/* Column 3 */}
        <div className="col-lg-4 col-md-4 col-sm-12 pb-1">
          <a className="text-decoration-none" href="">
            <div className="cat-item img-zoom d-flex align-items-center mb-4">
              <div
                className="overflow-hidden"
                style={{ width: "100px", height: "100px" }}
              >
                <img className="img-fluid" src={Cat3} alt="Category 3" />
              </div>
              <div className="flex-fill pl-3">
                <h6>Phụ kiện điện tử</h6>
                <small className="text-body">
                  Phụ kiện cho điện thoại, laptop, chơi game
                </small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Categories;
