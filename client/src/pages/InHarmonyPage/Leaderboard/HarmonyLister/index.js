import ComparedUser from '../ComparedUser';

const HarmonyLister = ({harmonyList}) => 
        Object.keys(harmonyList).map((item, i) => (
            <ul key={i}>
                <ComparedUser compEmail={harmonyList[item].email} compOverall={harmonyList[item].compatibility_score} />
            </ul>
        ));

export default HarmonyLister;