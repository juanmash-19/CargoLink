import FormCreateShip from "./FormCreateShip";
import { useTranslations } from "next-intl";

export default function ScreenCreateShip() {
    const t = useTranslations();

    return(

        <section className="bg-gray-100 text-black">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div className="lg:col-span-2 lg:py-12">
                        <p className="max-w-xl text-lg">
                            {t('user.shipments.create.infoText')}
                        </p>

                        <div className="mt-8">
                            <a href="#" className="text-2xl font-bold text-pink-600">
                                {t('user.shipments.create.contactNumber')}
                            </a>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        
                        <FormCreateShip />

                    </div>
                </div>
            </div>
        </section>
    );
}