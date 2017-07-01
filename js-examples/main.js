class GCounter {
  constructor(n) { this.n = n; }
  increment() { return new GCounter(this.n + 1); }
  query() { return this.n; }
  merge(counter) { return new GCounter(Math.max(counter.query(), this.n)); }
}

class PNCounter {
  constructor(p, n) { this.n = n; this.p = p}
  increment() { return new PNCounter(this.p.increment(), this.n); }
  decrement() { return new PNCounter(this.p, this.n.increment()); }
  query() { return this.p.query() - this.n.query(); }
  merge(pncounter) { return new PNCounter(this.p.merge(pncounter.p), this.n.merge(pncounter.n)); }
}


function examples_GCounter() {
  let log = (op, c1, c2) => console.log("[OP] " + op + ": c1=" + c1.query() + ", c2=" + c2.query());
  let counter1 = new GCounter(0);
  let counter2 = new GCounter(0);

  counter1 = counter1.increment();
  counter2 = counter2.merge(counter1);
  log("counter1++", counter1, counter2);
}


function examples_PNCounter() {
  let log = (op, c1, c2) => console.log("[OP] " + op + ": c1=" + c1.query() + ", c2=" + c2.query());
  let pn_counter1 = new PNCounter(new GCounter(0), new GCounter(0));
  let pn_counter2 = new PNCounter(new GCounter(0), new GCounter(0));

  pn_counter1 = pn_counter1.increment();
  pn_counter1 = pn_counter1.increment();
  log("[BEFORE MERGE] pncounter1++", pn_counter1, pn_counter2);
  pn_counter2 = pn_counter2.merge(pn_counter1);
  log("[AFTER MERGE] pncounter1++", pn_counter1, pn_counter2);
  pn_counter2 = pn_counter2.decrement();
  log("[BEFORE MERGE] pncounter2--", pn_counter1, pn_counter2);
  pn_counter1 = pn_counter1.increment();
  log("[BEFORE MERGE] pncounter1++", pn_counter1, pn_counter2);
  pn_counter1 = pn_counter1.merge(pn_counter2);
  pn_counter2 = pn_counter2.merge(pn_counter1);
  log("[AFTER MERGE]", pn_counter1, pn_counter2);
}

examples_PNCounter();