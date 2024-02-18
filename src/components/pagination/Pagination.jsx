import React from "react";

import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

const Pagination = ({ page, count }) => {
  const router = useRouter();
  const POST_PER_PAGE = 6;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <button
        disabled={!hasPrev}
        className={styles.button}
        onClick={() =>
          router.push(
            page === 2 ? `/recipelist` : `/recipelist?page=${page - 1}`
          )
        }
      >
        &lt;
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => router.push(`/recipelist?page=${page + 1}`)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
