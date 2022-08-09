import { MyNode } from "./type";

export const createMainAppDiv: MyNode = (parent) => {
  const app = document.createElement("div");

  app.classList.add("content");

  app.innerHTML = `<div class="container">
                        <div class="content-main">
                            <!--append skills here-->
                            <div class="skills"></div>
                            <div class="skills"></div>
                        </div>
                        <div class="footer">
                            <div id="elementals" class="skills-active">
                                <div class="skill"></div>
                                <div class="skill"></div>
                                <div class="skill"></div>
                            </div>
                            <div class="skills-invoked">
                                <div class="skill-invoked">
                                    <div class="key key-d "></div>
                                </div>
                                <div class="skill-invoked">
                                    <div class="key key-f"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;

  parent.appendChild(app);
};
