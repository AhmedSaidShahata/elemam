

export default defineNuxtPlugin(() => {
    if (!window.indexedDB) {
        console.error("IndexedDB is not supported by this browser.");
        return;
    }

    const cacheData = [
        "services",
        "services_header",
        "images",
        "company",
    ];

    const request = indexedDB.open("tourism_website_company", 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;

        for (let i = 0; i < cacheData.length; i++) {
            const enStore = `${cacheData[i]}_en`;
            const arStore = `${cacheData[i]}_ar`;

            if (!db.objectStoreNames.contains(enStore)) {
                const objectStoreEn = db.createObjectStore(enStore, {
                    keyPath: "index",
                });

                objectStoreEn.createIndex("nameIndex", "name", {
                    unique: false,
                });
            }

            if (!db.objectStoreNames.contains(arStore)) {
                const objectStoreAr = db.createObjectStore(arStore, {
                    keyPath: "index",
                });

                objectStoreAr.createIndex("nameIndex", "name", {
                    unique: false,
                });
            }
        }
    };

    return new Promise((resolve) => {
        request.onsuccess = (event) => {
            const db = event.target.result;

            resolve({
                provide: {
                    db,
                },
            });
        };

        request.onerror = (event) => {
            console.error(
                "Error opening the database:",
                event.target.error
            );

            resolve({
                provide: {
                    db: null,
                },
            });
        };
    });
});