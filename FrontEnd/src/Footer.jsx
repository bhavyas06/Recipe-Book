import { Link } from "react-router-dom";

export function Footer() {
    return (
        <>
            <section id="footer">
            <div className="logo-end">
            <Link to={"/"}>
                <img src="/images/Logo1.png" className="le"/>
            </Link>
            </div>
            <div classNameName="whole">
            <div className="left">
                <p className="p1">More about Recipe Realm</p>
                <p className="p2">
                Find free, easy-to-follow recipes you can cook at home from Australia's best brands. From timeless classNameics to
                modern trends, budget dinners to entertaining delights, save your favourite recipes and upload your own creations
                on RecipeRealm. <Link to={"/aboutUs"} classNameName="af">Learn more
                about us.</Link> To start your search, check out some <a href="Breakfast.html" className="af">breakfast recipes </a>
                and get cooking!
                </p>
            </div>

            <div className="right">
                <p>Sign up for the latest recipes and news</p>
                <input type="email" placeholder="email address"/>
                <button>Subscribe</button>
                <p style={{marginTop: "20px"}}>Follow Recipe Realm</p>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-pinterest"></i>
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-instagram"></i>
            </div>
            </div>
        </section>
        </>
    )
}