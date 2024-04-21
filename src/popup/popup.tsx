import React, {useState, useEffect} from 'react';

interface Extension {
    id: string;
    name: string;
    isApp: boolean;
    enabled: boolean;
    optionsUrl: string;
}

const getAllExtensions = (): Promise<Extension[]> => {
    return new Promise((resolve, reject) => {
        chrome.management.getAll((extensionsAndApps) => {
            chrome.management.getSelf((selfExtension) => {
                const extensions = extensionsAndApps.filter(
                    extension => !extension.isApp && extension.id !== selfExtension.id
                );
                resolve(extensions);
            });
        });
    });
};

const ExtensionList: React.FC = () => {
    const [extensions, setExtensions] = useState<Extension[]>([]);

    useEffect(() => {
        getAllExtensions().then(setExtensions);
    }, []);

    const handleExtensionClick = (extension: Extension) => {
        chrome.management.launchApp(extension.id,  () => {

        });
        window.open(extension.optionsUrl, '_blank');
    };

    return (
        <div>
            <h1>Installed Extensions</h1>
            <ul>
                {extensions.map(extension => (
                    <li key={extension.id} onClick={() => handleExtensionClick(extension)}>
                        <strong>Name:</strong> {extension.name} |
                        <strong>ID:</strong> {extension.id} |
                        <strong>Status:</strong> {extension.enabled ? 'Enabled' : 'Disabled'}
                        {extension.optionsUrl && <span> | Click to open options</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExtensionList;
