import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import InfoDialog from './Info';


export default function InfoButton() {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const renderContent = () => {
        switch (location.pathname) {
            case '/':
                return (
                    <>
                        <h3>Domovská stránka</h3>
                        <p>Zde naleznete přehled akcí. V pravém okně se nachází běžné úkoly, seskupené dle data. V levém jsou projekty a jejich podúkoly. Kliknutím na úkol si ho můžete detailně zobrazit v prostředním okně. Úkol dokončíte kliknutím na tlačítko "Splnit úkol".</p>
                    </>
                );
            case '/edit':
                return (
                    <>
                        <h3>Editační stránka</h3>
                        <p>Zde můžete přidávat, mazat a upravovat úkoly.</p>
                        <h5>Přidávání</h5>
                        <p>Pro přidání nejprve vyberte v levém okně možnost "Vytvořit". Následně můžete vyplnit formulář uprostřed a odeslat ho tlačítkem vespod. Položky "Název", "Datum" a v případě podúkolu "Projekt" jsou povinné.</p>
                        <h5>Úprava</h5>
                        <p>Pro úpravu nejprve vyberte v levém okně možnost "Upravit". Zobrazí se seznam, ze kterého vyberete akci k úpravě. Ta se poté propíše do formuláře, který po úpravě můžete odeslat.</p>
                        <h5>Mazání</h5>
                        <p>Pro mazání slouží okno vpravo, kde vyberete položku ze seznamu aktivních úkolů. Smazáním projektu odstraníte i všechny jeho podúkoly.</p>
                    </>
                );
            case '/stats':
                return (
                    <>
                        <h3>Sledování postupu</h3>
                        <p>Zde můžete sledovat historii vašich úkolů nebo si zobrazit úspěšnost v grafu.</p>
                        <h5>Historie</h5>
                        <p>Historii zobrazíte kliknutím na tlačítko "Tabulka" v přepínači pod navigační lištou. Data v tabulce můžete filtrovat pomocí ovládacích prvků nad ní.</p>
                        <h5>Graf</h5>
                        <p>Graf zobrazíte kliknutím na jeho možnost v přepínači pod navigační lištou. Můžete si zvolit, jaký rok se zobrazí.</p>
                    </>
                );
            default:
                return <p>Žádné informace pro tuto stránku.</p>;
        }
    };

    return (
        <>
            <div
                id="info_button"
                className="corner_button"
                onClick={handleOpen}
            >
                <a href="#">
                    <img src="src/icons/info.png" alt="info icon" />
                </a>
            </div>

            <InfoDialog open={open} onClose={handleClose} title="O aplikaci">
                {renderContent()}
                <h3>Kontakt</h3>
                <p>Vytvořil: Ondřej Všelko A24B0082P<br/>E-mail: vselon@students.zcu.cz<br/>2025</p>
            </InfoDialog>
        </>
    );
}