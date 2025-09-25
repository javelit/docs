import styles from "./psa.module.css";

const Psa = () => {
  return (
    <section className={styles.Container}>
      <i className={styles.Icon}>forum</i>
      <article>
        <h3 className={styles.Title}>Still have questions?</h3>
        <p className={styles.Text}>
          Go to our{" "}
          <a
            href="https://github.com/jeamlit/jeamlit/discussions"
            target="_blank"
            className={styles.Link}
          >
            discussions forum
          </a>{" "}
          for helpful information and advice from Jeamlit experts.
        </p>
      </article>
    </section>
  );
};

export default Psa;
