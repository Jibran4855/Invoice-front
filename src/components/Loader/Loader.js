
import "./index.css";

const Loader = (props) => {
    return (
        <>
            {props.isVisible && <div className="overlay">
                <div className="overlay__inner">
                    <div className="overlay__content">
                        <div className="breeding-rhombus-spinner">
                            <div className="rhombus child-1"></div>
                            <div className="rhombus child-2"></div>
                            <div className="rhombus child-3"></div>
                            <div className="rhombus child-4"></div>
                            <div className="rhombus child-5"></div>
                            <div className="rhombus child-6"></div>
                            <div className="rhombus child-7"></div>
                            <div className="rhombus child-8"></div>
                            <div className="rhombus big"></div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Loader;
