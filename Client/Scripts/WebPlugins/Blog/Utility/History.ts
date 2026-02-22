import { Observable } from "../../../Framework/Knockout/knockout"
import { PageOption } from "../../../WebCore/Contracts/PageOption"

export const UpdateHistoryAndPage = async (currentPage : Observable<IPartialViewModel<IHTMLInjectable<void, void>>>, selectedOption? : PageOption) => {
    if (selectedOption === undefined) throw "Invalid url state!"

    history.pushState(selectedOption.pageKey, selectedOption.FriendlyName, `/${selectedOption.pageKey}/`)

    const pageViewModel = selectedOption.modelConstructor()
    currentPage(pageViewModel)
    return pageViewModel.Model.Init();
}