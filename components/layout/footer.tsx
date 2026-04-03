import Link from "next/link"
import { AppLogo } from "../app-logo"

export function Footer() {
    return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-2">
                    <div>
                        <div className="text-2xl font-bold text-blue-400 mb-4">
                            <AppLogo />
                        </div>
                        <p className="text-gray-400 mb-4 text-pretty">
                            La plateforme de recrutement qui connecte les talents aux opportunités.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Candidats</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/emplois" className="hover:text-white transition-colors">
                                    Chercher un emploi
                                </Link>
                            </li>
                            <li>
                                <Link href="/explorer-entreprises" className="hover:text-white transition-colors">
                                    Parcourir les entreprises
                                </Link>
                            </li>
                            <li>
                                <Link href="/profil" className="hover:text-white transition-colors">
                                    Mon profil
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Entreprises</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/publier-offre" className="hover:text-white transition-colors">
                                    Publier une offre
                                </Link>
                            </li>
                            <li>
                                <Link href="/gestion-candidatures" className="hover:text-white transition-colors">
                                    Gérer les candidatures
                                </Link>
                            </li>
                            <li>
                                <Link href="/offres" className="hover:text-white transition-colors">
                                    Plans et tarifs
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/aide" className="hover:text-white transition-colors">
                                    Centre d'aide
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Nous contacter
                                </Link>
                            </li>
                            <li>
                                <Link href="/confidentialite" className="hover:text-white transition-colors">
                                    Confidentialité
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 dark:border-gray-700 pt-2 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Goriya. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    )
}
