import Image from "next/image";
import Link from "next/link";
import styles from "./newsletter.module.css";
import PrintButton from "./PrintButton";

const programs = [
  {
    title: "Annual Youth Camp",
    text: "Five days away from daily pressures for mentorship, worship, one-on-one conversations and teaching on issues affecting young people.",
  },
  {
    title: "Boys to Men",
    text: "Focused mentorship that helps boys develop character, responsibility, faith and a healthy understanding of manhood.",
  },
  {
    title: "Pad A Girl",
    text: "Supporting girls with sanitary pads, dignity education and encouragement so menstruation does not prevent them from attending school.",
  },
];

export default function July2026NewsletterPage() {
  return (
    <main className={styles.site}>
      <div className={styles.toolbar}>
        <Link href="/" className={styles.backButton}>
          ← Back Home
        </Link>
        <PrintButton className={styles.printButton} />
      </div>

      <article className={styles.newsletter}>
        {/* PAGE 1 */}
        <section className={`${styles.page} ${styles.premiumCover}`}>
          <div className={styles.coverTopBar}>
            <div className={styles.coverBrand}>
              <Image
                src="/images/newsletter/july-2026/logo.jpg"
                alt="Impact Generation Global logo"
                width={300}
                height={140}
                className={styles.coverBrandLogo}
                priority
              />
              <div>
                <strong>Impact Generation Global</strong>
                <span>Zambia and beyond</span>
              </div>
            </div>

            <p className={styles.coverIssue}>July 2026 Ministry Newsletter</p>
          </div>

          <div className={styles.coverPhotoFrame}>
            <Image
              src="/images/newsletter/july-2026/school-ministry.jpg"
              alt="Impact Generation Global school ministry"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              className={styles.coverPhoto}
            />
            <div className={styles.coverPhotoShade} />
            <div className={styles.coverPhotoLabel}>
              <span>Faith in action</span>
              <strong>Reaching young people where they are</strong>
            </div>
          </div>

          <div className={styles.coverTitlePanel}>
            <p className={styles.coverKicker}>
              Discipleship • Dignity • Healthy Choices
            </p>
            <h1>Transforming the Next Generation</h1>
            <p className={styles.coverIntro}>
              Lasting hope in Jesus Christ through mentorship, practical
              support, leadership development and community outreach.
            </p>

            <div className={styles.coverHighlights}>
              <span>Youth Ministry</span>
              <span>School Outreach</span>
              <span>Community Impact</span>
            </div>
          </div>
        </section>

        {/* PAGE 2 */}
        <section className={`${styles.page} ${styles.lightPage}`}>
          <div className={styles.heroStrip}>
            <Image
              src="/images/newsletter/july-2026/cycle-for-change.jpg"
              alt="Cycle for Change"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className={styles.coverImage}
            />
            <div className={styles.heroStripOverlay} />
            <div className={styles.heroStripText}>
              <h2>Welcoming Joseph Hoag</h2>
              <p>
                A new board member with a passion for discipleship and
                transformation across Africa.
              </p>
            </div>
          </div>

          <div className={styles.pageBody}>
            <div className={styles.joeGrid}>
              <Image
                src="/images/newsletter/july-2026/joe.jpg"
                alt="Joseph Hoag"
                width={900}
                height={900}
                className={styles.joePortrait}
              />

              <div>
                <h3>August Zambia Mission</h3>
                <p>
                  Joseph is an exceptional leader who is passionate about seeing
                  young people in Zambia and across Africa discipled and
                  transformed. This August, he will accompany David Luby on an
                  extended ministry trip to Zambia.
                </p>

                <div className={styles.stack}>
                  <InfoCard
                    title="Strengthen leadership"
                    text="Meet local ministry leaders and encourage the teams serving on the ground."
                  />
                  <InfoCard
                    title="Invest in youth"
                    text="Spend time with young people whose lives are being touched through our programmes."
                  />
                  <InfoCard
                    title="Build partnerships"
                    text="Connect with churches, schools and community organisations."
                  />
                  <InfoCard
                    title="Plan for the future"
                    text="Develop initiatives that create sustainable, long-term impact."
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer page="2" />
        </section>

        {/* PAGE 3 */}
        <section className={`${styles.page} ${styles.lightPage}`}>
          <header className={styles.greenHeader}>
            <h2>A Season of Sorrow and Hope</h2>
          </header>

          <div className={styles.pageBody}>
            <div className={styles.twoColumns}>
              <div>
                <Image
                  src="/images/newsletter/july-2026/andy.jpg"
                  alt="Andrew “Andy” Rovengo"
                  width={700}
                  height={900}
                  className={styles.portrait}
                />
              </div>

              <div>
                <p className={styles.eyebrow}>In Loving Memory</p>
                <h3>Greetings in the Name of Our Lord Jesus Christ</h3>
                <p>
                  Indeed, God works in ways we do not always understand. Late in
                  May, we lost one of our beloved board members, Andrew “Andy”
                  Rovengo. Andy was not only a board member; he was a faithful
                  friend and ministry partner. He supported the organisation
                  financially and helped strengthen our paperwork, governance
                  and organisational structure.
                </p>
                <p>
                  We thank God for Andy’s life, wisdom and generosity. His
                  contribution will remain part of the foundation of Impact
                  Generation Global for years to come.
                </p>

                <div className={styles.goldQuote}>
                  <strong>“Well done, good and faithful servant.”</strong>
                  <span>Matthew 25:21</span>
                </div>
              </div>
            </div>

            <div className={styles.whiteCard}>
              <h4>Even in grief, God continues to provide.</h4>
              <p>
                As we mourn Andy’s passing, we also recognise God’s comfort and
                faithfulness. He has brought a young and energetic leader, Joseph
                Hoag, to serve with us. This newsletter shares both the loss
                we have experienced and the hope-filled work that continues
                among young people in Zambia.
              </p>
            </div>
          </div>
          <Footer page="3" />
        </section>

        {/* PAGE 4 */}
        <section className={`${styles.page} ${styles.whitePage}`}>
          <div className={styles.pageBody}>
            <p className={styles.eyebrowGold}>What We Do</p>
            <h2 className={styles.darkTitle}>
              Discipleship at the centre of every programme
            </h2>
            <p className={styles.lead}>
              Impact Generation Global focuses on transforming young lives
              through discipleship, practical education and healthy activities.
              The Word of God remains our primary foundation in every outreach.
            </p>

            <div className={styles.photoGrid}>
              <FeaturePhoto
                src="/images/newsletter/july-2026/cycle-for-change.jpg"
                title="Cycle for Change"
                text="Bicycles gather young people, encourage healthy living and create opportunities to provide drug-abuse prevention education while sharing the Gospel."
              />
              <FeaturePhoto
                src="/images/newsletter/july-2026/school-ministry.jpg"
                title="School Ministry"
                text="With access granted through education authorities and school leaders, our teams reach young people in schools with drug-abuse prevention education, mentoring and discipleship."
              />
            </div>

            <div className={styles.threeCards}>
              {programs.map((program) => (
                <div className={styles.programCard} key={program.title}>
                  <div className={styles.goldDot} />
                  <h4>{program.title}</h4>
                  <p>{program.text}</p>
                </div>
              ))}
            </div>
          </div>
          <Footer page="4" />
        </section>

        {/* PAGE 5 */}
        <section className={`${styles.page} ${styles.lightPage}`}>
          <div className={styles.padHero}>
            <Image
              src="/images/newsletter/july-2026/pad-a-girl.jpg"
              alt="Pad A Girl outreach"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className={styles.coverImage}
            />
            <div className={styles.heroStripOverlay} />
            <div className={styles.heroStripText}>
              <h2>Dignity for More Than 60 Girls</h2>
              <p>A successful Pad A Girl outreach in early July.</p>
            </div>
          </div>

          <div className={styles.pageBody}>
            <h3>Partnership makes greater impact possible.</h3>
            <p>
              In early July, Babuyu Foundation organised a successful Pad A Girl
              programme in partnership with Liseli Foundation, Lilato Foundation
              and Impact Generation Global. Babuyu Foundation donated sanitary
              pads to more than 60 girls.
            </p>
            <p>
              The outreach addressed a practical need while also creating space
              to encourage the girls, affirm their dignity and remind them that
              they are valued by God. We are grateful for every organisation and
              individual who made this day possible.
            </p>

            <div className={styles.greenQuote}>
              <strong>Pads restore dignity. Discipleship restores hope.</strong>
              <span>
                Together, practical support and the Gospel can keep girls in
                school and moving toward their future.
              </span>
            </div>
          </div>
          <Footer page="5" />
        </section>

        {/* PAGE 6 */}
        <section className={`${styles.page} ${styles.darkPage}`}>
          <div className={styles.pageBody}>
            <p className={styles.eyebrowGold}>
              Katombora Juvenile Correctional Facility
            </p>
            <h2 className={styles.whiteTitle}>Hope Behind Prison Walls</h2>

            <Image
              src="/images/newsletter/july-2026/prison-ministry.jpg"
              alt="Supplies donated during prison ministry"
              width={1400}
              height={700}
              className={styles.widePhoto}
            />

            <div className={styles.darkCard}>
              <h3>Transformation is possible.</h3>
              <p>
                For the past several years, Impact Generation Global has visited
                juveniles at Katombora, sharing the love of Christ and donating
                groceries and other necessities. Although these young people
                have made mistakes, we believe their past does not have to
                define their future.
              </p>
              <p>
                Through discipleship, encouragement and practical care, we
                remind them that they can change, return to society and become
                responsible people who contribute positively to their families
                and communities.
              </p>
            </div>

            <div className={styles.goldQuote}>
              <strong>“If anyone is in Christ, he is a new creation.”</strong>
              <span>2 Corinthians 5:17</span>
              <em>No young person is beyond the reach of God’s grace.</em>
            </div>
          </div>
          <Footer page="6" dark />
        </section>

        {/* PAGE 7 */}
        <section className={`${styles.page} ${styles.lightPage}`}>
          <div className={styles.landHero}>
            <Image
              src="/images/newsletter/july-2026/land.jpg"
              alt="Land purchased for future ministry development"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className={styles.coverImage}
            />
            <div className={styles.heroStripOverlay} />
            <div className={styles.heroStripText}>
              <p className={styles.eyebrowGold}>Building for the Future</p>
              <h2>A permanent home for ministry</h2>
            </div>
          </div>

          <div className={styles.pageBody}>
            <p className={styles.lead}>
              With the support of our partners, Impact Generation Global was
              able to purchase a piece of land this year. We plan to develop a
              centre for ministry activities and a team house.
            </p>

            <div className={styles.stack}>
              <InfoCard
                title="Youth centre"
                text="A welcoming place for discipleship, counselling, leadership development and skills training."
              />
              <InfoCard
                title="Programme base"
                text="A permanent home for school ministry, Cycle for Change, Boys to Men and Pad A Girl activities."
              />
              <InfoCard
                title="Team house"
                text="Accommodation for visiting ministry teams, partners and leaders serving alongside our local staff."
              />
            </div>

            <div className={styles.navyCallout}>
              <p className={styles.eyebrowGold}>
                A Long-Term Investment in the Next Generation
              </p>
              <h3>This vision requires prayer, partnership and support.</h3>
              <p>
                Every contribution helps us move closer to a sustainable
                ministry centre where young people can be discipled, protected,
                trained and released into their God-given purpose.
              </p>
            </div>
          </div>
          <Footer page="7" />
        </section>

        {/* PAGE 8 */}
        <section className={`${styles.page} ${styles.finalPage}`}>
          <div className={styles.pageBody}>
            <p className={styles.eyebrowGold}>Partner With Us</p>
            <h2 className={styles.whiteTitle}>
              Help us reach the next generation.
            </h2>
            <p className={styles.finalLead}>
              Your prayers and financial support help provide discipleship,
              school outreach, youth camps, dignity programmes, prison ministry,
              leadership development and the August Zambia mission.
            </p>

            <div className={styles.donationGrid}>
              <div className={styles.qrCard}>
                <Image
                  src="/images/newsletter/july-2026/donate-qr.png"
                  alt="Donation QR code"
                  width={420}
                  height={420}
                  className={styles.qr}
                />
                <strong>Scan to Donate</strong>
              </div>

              <div>
                <h3>Support the work</h3>
                <p>
                  Visit our website to give toward the ministry, the land
                  development project, or David Luby and Joseph Hoag’s August
                  mission to Zambia.
                </p>

                <a
                  href="https://impactgenerationglobal.org/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.donateLink}
                >
                  impactgenerationglobal.org/donate
                </a>

                <h3 className={styles.thankYou}>
                  Thank you for standing with us.
                </h3>
                <p>
                  Together, we can raise a generation that knows Christ, rejects
                  drug abuse, walks in purpose and transforms communities.
                </p>
              </div>
            </div>

            <div className={styles.signature}>
              <p>
                <em>In His service,</em>
              </p>
              <strong>David Luby</strong>
              <span>Executive Director, Impact Generation Global</span>
            </div>
          </div>
          <Footer page="8" dark />
        </section>
      </article>
    </main>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className={styles.infoCard}>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function FeaturePhoto({
  src,
  title,
  text,
}: {
  src: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <Image
        src={src}
        alt={title}
        width={1000}
        height={700}
        className={styles.featurePhoto}
      />
      <h3 className={styles.greenHeading}>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Footer({ page, dark = false }: { page: string; dark?: boolean }) {
  return (
    <footer className={`${styles.footer} ${dark ? styles.footerDark : ""}`}>
      <span>Impact Generation Global | July 2026 Newsletter</span>
      <span>{page}</span>
    </footer>
  );
}
