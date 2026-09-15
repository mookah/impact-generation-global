import Image from "next/image";
import Link from "next/link";
import styles from "./newsletter.module.css";
import PrintButton from "./PrintButton";

const ORG = "Impact Generation Global";
const ISSUE = "AUGUST 2026";

export default function AugustNewsletterPage() {
  return (
    <main className={styles.site}>
      {/* =====================================================
          WEBSITE CONTROLS
      ====================================================== */}
      <div className={styles.toolbar}>
        <Link href="/" className={styles.backButton}>
          ← Back Home
        </Link>

        <PrintButton className={styles.printButton} />
      </div>

      <article className={styles.newsletter}>
        {/* =====================================================
            PAGE 1 — FRONT PAGE
        ====================================================== */}
        <section className={styles.page}>
          <NewsletterHeader />

          <Watermark src="/images/newsletter/august-2026/youth-camp-group.jpg" />

          <div className={styles.pageContent}>
            <div className={styles.introBox}>
              Impact Generation Global is a Christ-centered ministry
              committed to discipleship, education, counselling,
              self-empowerment, healthy living and youth development.
              Through practical programmes and community outreach, we are
              investing in the next generation and helping young people
              discover purpose, character and faith in Jesus Christ.
            </div>

            <SmallTitle>VISION</SmallTitle>

            <p className={styles.centerStatement}>
              “To see a transformed generation of young people empowered
              with Christ-centered values, practical skills and sustainable
              opportunities to lead their communities with purpose and
              dignity.”
            </p>

            <SmallTitle>MISSION</SmallTitle>

            <p className={styles.centerText}>
              Impact Generation Global walks alongside young people through:
            </p>

            <p className={styles.missionList}>
              Discipleship • Education & Counselling • Youth Development •
              Self-Empowerment • Healthy Living
            </p>

            <p className={styles.centerSmall}>
              Our goal is to raise devoted disciples of Jesus Christ and
              equip young people to become positive influences in their
              generation.
            </p>

            <div className={styles.qrCenter}>
              <Image
                src="/images/newsletter/july-2026/donate-qr.png"
                alt="Donation QR code"
                width={112}
                height={112}
              />
            </div>

            <div className={styles.blueDivider} />

            <div className={styles.greeting}>
              <h3>Dear Friends,</h3>

              <p>
                August was one of the most active and memorable months in the
                life of Impact Generation Global.
              </p>

              <p>
                From Youth Camp 2026 and the visit of David Luby and Joe
                Hoag, to international fellowship, Cycle for Change,
                community outreach and the Come Go With Us Crusade, we
                witnessed God working through many different expressions
                of ministry.
              </p>
            </div>
          </div>

          <BottomLogo />
          <PageFooter page="1" />
        </section>

        {/* =====================================================
            PAGE 2 — YOUTH CAMP
        ====================================================== */}
        <section className={styles.page}>
          <NewsletterHeader />

          <Watermark src="/images/newsletter/august-2026/camp-wide-teaching-session.jpg" />

          <div className={styles.pageContent}>
            <SectionTitle>YOUTH CAMP 2026</SectionTitle>

            <h3 className={styles.articleTitle}>
              Six Days of Faith, Friendship & Purpose
            </h3>

            <p>
              From 18 to 23 August, more than 50 Gen Z young people gathered
              for Youth Camp 2026.
            </p>

            <p>
              The programme included sessions during the day and at night,
              creating an environment for teaching, worship, mentorship,
              prayer, fellowship and practical life development.
            </p>

            <div className={styles.stats}>
              <div>
                <strong>50+</strong>
                <span>Young People</span>
              </div>

              <div>
                <strong>6 Days</strong>
                <span>18–23 August</span>
              </div>

              <div>
                <strong>Day & Night</strong>
                <span>Sessions</span>
              </div>
            </div>

            <p>
              Young people learned together, prayed together and developed
              meaningful friendships. The camp created an atmosphere where
              they could freely participate, ask questions and grow
              spiritually and socially.
            </p>

            <p>
              One of the memorable highlights was the food. Meals were
              prepared in abundance and there was enough for everyone.
            </p>

            <div className={styles.photoGridTwo}>
              <Photo
                src="/images/newsletter/august-2026/camp-wide-teaching-session.jpg"
                alt="Youth Camp teaching session"
              />

              <Photo
                src="/images/newsletter/august-2026/camp-food-prepared.jpg"
                alt="Food prepared for Youth Camp participants"
              />
            </div>

            <Highlight>
              <strong>CAMP BECAME A FAMILY</strong>
              <span>
                Young people worshipped, learned, ate, laughed and grew
                together throughout the six-day programme.
              </span>
            </Highlight>
          </div>

          <BottomLogo />
          <PageFooter page="2" />
        </section>

        {/* =====================================================
            PAGE 3 — VISION TOUR
        ====================================================== */}
        <section className={styles.page}>
          <NewsletterHeader />

          <Watermark src="/images/newsletter/august-2026/youth-camp-group.jpg" />

          <div className={styles.pageContent}>
            <SectionTitle>VISION TOUR</SectionTitle>

            <h3 className={styles.articleTitle}>
              Dave & Joe Visit Zambia
            </h3>

            <p>
              August also welcomed David Luby, our USA Director, together
              with board member Joe Hoag, who travelled to Zambia on a
              vision and ministry tour.
            </p>

            <p>
              Their visit provided an opportunity to connect directly with
              the Zambia team and young people, strengthen relationships,
              listen to stories from the field and discuss the future
              direction of Impact Generation Global.
            </p>

            <p>
              Soon after arriving, the team visited the newly acquired land
              and dedicated it to the Lord. A prayer walk was conducted
              across the property, committing the future ministry centre
              and the generations that will be served there into God&apos;s
              hands.
            </p>

            <p>
              Dave and Joe also spent meaningful time among the young people.
              Their presence reflected the relational heart of the ministry:
              leadership that does not simply observe from a distance, but
              walks alongside the people it serves.
            </p>

            <div className={styles.photoGridTwo}>
              <Photo
                src="/images/newsletter/august-2026/youth-camp-group.jpg"
                alt="David and Impact Generation young people"
              />

              <Photo
                src="/images/newsletter/august-2026/vision-team-visit.jpg"
                alt="Impact Generation youth gathering"
              />
            </div>

            <Highlight>
              <strong>BUILDING RELATIONSHIPS, BUILDING THE FUTURE</strong>
              <span>
                The vision tour strengthened the connection between our
                international leadership, Zambia team and young people.
              </span>
            </Highlight>
          </div>

          <BottomLogo />
          <PageFooter page="3" />
        </section>

        {/* =====================================================
            PAGE 4 — INTERNATIONAL FELLOWSHIP
        ====================================================== */}
        <section className={styles.page}>
          <NewsletterHeader />

          <Watermark src="/images/newsletter/august-2026/camp-breakfast-leaders.jpg" />

          <div className={styles.pageContent}>
            <SectionTitle>INTERNATIONAL FELLOWSHIP</SectionTitle>

            <h3 className={styles.articleTitle}>
              Michel Nowelland & Miary Rakotondranaivo
            </h3>

            <p>
              Michel Nowelland and Miary Rakotondranaivo from Madagascar
              added a special flavour to Youth Camp 2026.
            </p>

            <p>
              Their down-to-earth attitude, humility and willingness to
              interact personally with the young people made it easy for
              them to connect naturally with camp participants.
            </p>

            <p>
              Their involvement did not end with simply attending the camp.
              Michel and Miary are working with our young people, teaching
              drama and other creative activities that can be used during
              field outreach.
            </p>

            <p>
              Drama gives the young people another way of communicating
              messages of faith, hope, purpose and transformation to their
              peers and communities.
            </p>

            <div className={styles.photoGridTwo}>
              <Photo
                src="/images/newsletter/august-2026/camp-breakfast-leaders.jpg"
                alt="International fellowship at Youth Camp"
              />

              <Photo
                src="/images/newsletter/august-2026/camp-certificates-couple.jpg"
                alt="International guests with Youth Camp certificates"
              />
            </div>

            <Highlight>
              <strong>CREATIVITY FOR THE FIELD</strong>
              <span>
                Drama and creative activities are becoming practical tools
                for discipleship, evangelism and youth engagement.
              </span>
            </Highlight>
          </div>

          <BottomLogo />
          <PageFooter page="4" />
        </section>

        {/* =====================================================
            PAGE 5 — CAMP LIFE & LEADERSHIP
        ====================================================== */}
        <section className={styles.page}>
          <NewsletterHeader />

          <Watermark src="/images/newsletter/august-2026/camp-leadership-meeting.jpg" />

          <div className={styles.pageContent}>
            <SectionTitle>CAMP LIFE & LEADERSHIP</SectionTitle>

            <h3 className={styles.subTitle}>
              Leadership Around the Table
            </h3>

            <p>
              This year&apos;s camp was strengthened by leaders who took
              time to sit with the young people, listen to them and help
              them think seriously about life, faith and purpose.
            </p>

            <p>
              Brother Joseph travelled from Choma to help lead the camp,
              while David and Fred also spent dedicated time speaking to
              young people about vision, focus, discipline and commitment.
            </p>

            <div className={styles.photoGridTwo}>
              <Photo
                src="/images/newsletter/august-2026/camp-leadership-meeting.jpg"
                alt="Camp leadership discussion with young people"
              />

              <Photo
                src="/images/newsletter/august-2026/youth-camp-mealtime.jpg"
                alt="Young people enjoying camp fellowship"
              />
            </div>

            <h3 className={styles.subTitle}>
              Food, Fellowship & Friendship
            </h3>

            <p>
              The generous food provision was another memorable part of
              camp life. There was enough for everyone, and meals became
              opportunities for conversation, laughter and stronger
              friendships.
            </p>

            <h3 className={styles.subTitle}>
              A Visit from Botswana
            </h3>

            <p>
              During the camp, the young people were also blessed by a visit
              from an apostle from Botswana, adding another valuable moment
              of spiritual encouragement and international fellowship.
            </p>

            <Highlight>
              <strong>LEADERSHIP THAT WALKS WITH YOUNG PEOPLE</strong>
              <span>
                Camp leadership was not only about speaking from the front,
                but also sitting, eating, listening and sharing life
                together.
              </span>
            </Highlight>
          </div>

          <BottomLogo />
          <PageFooter page="5" />
        </section>

        {/* =====================================================
            PAGE 6 — CYCLE FOR CHANGE
        ====================================================== */}
        <section className={styles.page}>
          <NewsletterHeader />

          <Watermark src="/images/newsletter/august-2026/cycle-for-change-street.jpg" />

          <div className={styles.pageContent}>
            <SectionTitle>CYCLE FOR CHANGE</SectionTitle>

            <h3 className={styles.articleTitle}>
              When Bicycles Became Tools for Evangelism
            </h3>

            <p>
              Impact Generation Global participated in the 2026 Come Go
              With Us Crusade and played an important role in community
              mobilisation.
            </p>

            <p>
              Cycle for Change was intentionally dedicated to advertising
              the crusade. Young cyclists were given flyers and rode
              through surrounding communities inviting people to attend.
            </p>

            <p>
              What normally serves as a programme for healthy living,
              discipline and youth engagement became a practical
              evangelistic tool.
            </p>

            <p>
              Every bicycle carried more than a rider. It carried an
              invitation.
            </p>

            <div className={styles.photoGridTwo}>
              <Photo
                src="/images/newsletter/august-2026/cycle-for-change-street.jpg"
                alt="Cycle for Change community outreach"
              />

              <Photo
                src="/images/newsletter/august-2026/cycle-for-change-team.jpg"
                alt="Cycle for Change ministry team"
              />
            </div>

            <Highlight>
              <strong>EVERY BICYCLE BECAME A MESSENGER</strong>
              <span>
                Young people used what was already in their hands to carry
                the crusade invitation into the community.
              </span>
            </Highlight>
          </div>

          <BottomLogo />
          <PageFooter page="6" />
        </section>

        {/* =====================================================
            PAGE 7 — SCHOOL & COMMUNITY MINISTRY
        ====================================================== */}
        <section className={styles.page}>
          <NewsletterHeader />

          <Watermark src="/images/newsletter/august-2026/evangelism-for-change.jpg" />

          <div className={styles.pageContent}>
            <SectionTitle>SCHOOL & COMMUNITY MINISTRY</SectionTitle>

            <h3 className={styles.articleTitle}>
              Reaching Young People Where They Are
            </h3>

            <p>
              The work of Impact Generation Global continues beyond camps
              and crusades into schools and local communities.
            </p>

            <p>
              Through school ministry, young people receive mentorship,
              discipleship, encouragement and practical guidance on issues
              such as discipline, drug abuse prevention, healthy living,
              purpose and making positive life choices.
            </p>

            <p>
              Schools provide an important opportunity to reach young
              people within an environment where they spend much of their
              everyday lives.
            </p>

            <p>
              Community outreach further allows our teams to connect with
              young people and families outside organised ministry
              programmes.
            </p>

            <div className={styles.largePhoto}>
              <Image
                src="/images/newsletter/july-2026/school-ministry.jpg"
                alt="Impact Generation school ministry"
                fill
                sizes="(max-width: 768px) 100vw, 850px"
                className={styles.photo}
              />
            </div>

            <Highlight>
              <strong>ONE MISSION — MANY EXPRESSIONS</strong>
              <span>
                Through schools, camps, bicycles, drama and community
                outreach, our purpose remains the same: transforming the
                next generation.
              </span>
            </Highlight>
          </div>

          <BottomLogo />
          <PageFooter page="7" />
        </section>

        {/* =====================================================
            PAGE 8 — DAVE'S BAPTISM
        ====================================================== */}
        <section className={styles.page}>
          <NewsletterHeader />

          <Watermark src="/images/newsletter/august-2026/crusade-certificates-group.jpg" />

          <div className={styles.pageContent}>
            <SectionTitle>BAPTISM & NEW BEGINNINGS</SectionTitle>

            <h3 className={styles.articleTitle}>
              Dave Gets Baptised at the Come Go With Us Crusade
            </h3>

            <p>
              One of the most memorable moments of the 2026 Come Go With Us
              Crusade was the baptism of our USA Director, David Luby.
            </p>

            <p>
              Dave&apos;s decision to be baptised was more than a personal
              moment of faith. For many of the young people who had come to
              know him during his time in Zambia, it became a visible
              expression of humility, commitment and his heart for the
              ministry.
            </p>

            <p>
              Having travelled from the United States to serve alongside
              the Impact Generation team, Dave did not position himself
              above the people he came to encourage. He chose to participate
              in the same spiritual journey taking place among those being
              reached through the crusade.
            </p>

            <div className={styles.photoGridTwo}>
              <Photo
                src="/images/newsletter/august-2026/dave-baptism-certificate-cropped.jpg"
                alt="David Luby holding his Certificate of Baptism"
              />

              <Photo
                src="/images/newsletter/august-2026/crusade-certificates-group.jpg"
                alt="Crusade participants holding baptism certificates"
              />
            </div>

            <p>
              Dave was among many people who were baptised during the
              crusade and later received a Certificate of Baptism.
            </p>

            <Highlight>
              <strong>FAITH THAT LEADS BY EXAMPLE</strong>
              <span>
                Dave&apos;s baptism reminded us that leadership is not only
                about teaching others — it is also about walking alongside
                them.
              </span>
            </Highlight>
          </div>

          <BottomLogo />
          <PageFooter page="8" />
        </section>

        {/* =====================================================
            PAGE 9 — FULL-CIRCLE TESTIMONY
        ====================================================== */}
        <section className={styles.page}>
          <NewsletterHeader />

          <Watermark src="/images/newsletter/august-2026/samaritan-purse-zambia-children.jpg" />

          <div className={styles.pageContent}>
            <SectionTitle>A FULL-CIRCLE TESTIMONY</SectionTitle>

            <h3 className={styles.articleTitle}>
              From the Packing Table to the Hands of a Child
            </h3>

            <p>
              One of the most touching and unexpected moments of the August
              visit came through our board member, Joe Hoag.
            </p>

            <p>
              Back in the United States, Joe has personally been involved
              in packing Samaritan&apos;s Purse gift boxes for children.
              Like many volunteers, he has helped prepare these gifts in
              faith, trusting that they would eventually reach children
              who need encouragement and joy.
            </p>

            <p>
              During his visit to Zambia, Joe experienced something he had
              never seen before — the receiving end of those very gifts.
            </p>

            <div className={styles.photoGridTwo}>
              <Photo
                src="/images/newsletter/august-2026/samaritan-purse-usa-team.jpg"
                alt="Joe Hoag and volunteers with Samaritan's Purse gift boxes in the USA"
              />

              <Photo
                src="/images/newsletter/august-2026/samaritan-purse-zambia-children.jpg"
                alt="Joe witnessing children receiving Samaritan's Purse gifts in Zambia"
              />
            </div>

            <p>
              Joe stood among children as gift boxes were distributed and
              watched their excitement as they received items that had
              travelled thousands of kilometres from donors and volunteers
              overseas.
            </p>

            <p>
              The moment became a powerful confirmation that generosity
              entrusted to the programme reaches real children on the
              ground. Joe was able to witness both ends of the journey —
              people giving and packing in the United States, and children
              receiving with joy in Zambia.
            </p>

            <p>
              He returns home carrying more than photographs. He carries a
              testimony of stewardship, partnership and the impact that
              generosity can have across borders.
            </p>

            <Highlight>
              <strong>TRANSPARENCY IN ACTION</strong>
              <span>
                A gift packed with love thousands of kilometres away became
                a moment of joy in the hands of a child in Zambia.
              </span>
            </Highlight>
          </div>

          <BottomLogo />
          <PageFooter page="9" />
        </section>
      </article>
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function NewsletterHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span>IMPACT</span>
        <span>GENERATION</span>
        <strong>GLOBAL</strong>
      </div>

      <div className={styles.newsTitle}>
        <strong>NEWSLETTER</strong>
        <span>{ISSUE}</span>
      </div>
    </header>
  );
}

function Watermark({ src }: { src: string }) {
  return (
    <div className={styles.watermark}>
      <Image
        src={src}
        alt=""
        fill
        sizes="900px"
        className={styles.watermarkImage}
      />
    </div>
  );
}

function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function SmallTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h2 className={styles.smallTitle}>{children}</h2>;
}

function Photo({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className={styles.photoCard}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        className={styles.photo}
      />
    </div>
  );
}

function Highlight({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.highlightBox}>{children}</div>;
}

function BottomLogo() {
  return (
    <div className={styles.bottomLogo}>
      <Image
        src="/images/newsletter/july-2026/logo.jpg"
        alt="Impact Generation Global logo"
        width={120}
        height={65}
      />
    </div>
  );
}

function PageFooter({ page }: { page: string }) {
  return (
    <footer className={styles.footer}>
      <span>{ORG}</span>
      <span>Page {page}</span>
    </footer>
  );
}