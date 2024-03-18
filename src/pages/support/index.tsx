import React from "react";
import styles from "./styles.module.scss";
import Layout from "../../theme/Layout";
import HomepageStarter from "@site/src/components/HomepageStarter";
import { Button } from "@arco-design/web-react";

type SupportDataType = {
  name: string;
  inner: string;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  btn: string;
};
export const SupportData: SupportDataType[] = [
  {
    name: "Discord Support",
    inner:
      "We offer email based support. If you need SLAs, guaranteed response times, or have an issue, please contact us here.",
    href: "https://discord.com/channels/918759925805617163/1128586819185934436",
    target: "_blank",
    btn: "Join Discord",
  },
  {
    name: "Email Support",
    inner:
      "We offer email based support. If you need SLAs, guaranteed response times, or have an issue, please contact us here.",
    href: "mailto:support@oomol.com",
    target: undefined,
    btn: "Email To Us",
  },
];
export default function Support() {
  const supportNodes = SupportData.map((data, index) => {
    return (
      <div className={styles.supportCell} key={`support-${index}`}>
        <div className={styles.title}>{data.name}</div>
        <div className={styles.inner}>
          <div className={styles.text}>{data.inner}</div>
          <Button target={data.target} href={data.href}>
            {data.btn}
          </Button>
        </div>
      </div>
    );
  });
  return (
    <Layout>
      <div className={styles.supportBox}>
        <div className={styles.supportTitle}>Support</div>
        <div className={styles.supportCellBox}>
          <div className={styles.supportCell}>
            <div className={styles.title}>
              <span className={styles["support-title"]}>Discord Support</span>
            </div>
            <div className={styles.inner}>
              <div className={styles.text}>
                We offer email based support. If you need SLAs, guaranteed
                response times, or have an issue, please contact us here.
              </div>
              <Button
                target="_blank"
                href="https://discord.com/channels/918759925805617163/1128586819185934436"
              >
                Join Discord
              </Button>
            </div>
          </div>
          <div className={styles.supportCell}>
            <div className={styles.title}>
              <span className={styles["support-title"]}>Email Support</span>
            </div>
            <div className={styles.inner}>
              <div className={styles.text}>
                We offer email based support. If you need SLAs, guaranteed
                response times, or have an issue, please contact us here.
              </div>
              <Button href="mailto:support@oomol.com">Email To Us</Button>
            </div>
          </div>
        </div>
      </div>
      <HomepageStarter />
    </Layout>
  );
}
